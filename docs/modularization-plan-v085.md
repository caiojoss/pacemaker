# Pacemaker v0.8.5 - Modularization Plan

Fonte oficial: `docs/contract-inventory.md` e `docs/contract-freeze.md`.

Objetivo: definir como o `index.html` deve ser quebrado com risco minimo, preparando a React Foundation sem quebrar a aplicacao Vanilla existente.

## Executive Summary

A v0.8.5 deve ser uma modularizacao progressiva. O alvo nao e substituir o app por React imediatamente; o alvo e criar fundacao para que React entre com seguranca depois que contratos globais, estado, storage e renderizacao estiverem sob controle.

A regra central: extrair primeiro codigo puro e adapters, manter os contratos congelados e so depois mover integracoes sensiveis. UI critica e handlers inline devem ser os ultimos a mudar.

## Principios de migracao

- Preservar 100% de compatibilidade funcional durante cada commit.
- Nao alterar schema de `state`.
- Nao alterar `state.workouts`.
- Nao alterar chaves `localStorage`.
- Nao alterar Firestore path `users/{uid}`.
- Nao remover `window._fb*`.
- Nao remover funcoes globais chamadas por HTML.
- Nao renomear IDs DOM.
- Nao mover service worker/manifest no inicio.
- React deve entrar inicialmente como fundacao/ilha isolada, nao como dono do app shell.

## Arquitetura alvo intermediaria v0.8.5

```text
index.html
|-- HTML/CSS atuais preservados
|-- boot script minimo
|-- importa modulos extraidos
|-- registra facade global temporaria

src/
|-- core/
|   |-- state.js
|   |-- storage.js
|   |-- dates.js
|   |-- metrics.js
|   `-- workout-model.js
|-- adapters/
|   |-- global-facade.js
|   |-- dom-ids.js
|   `-- firebase-window-adapter.js
|-- features/
|   |-- dashboard.js
|   |-- log.js
|   |-- planner.js
|   |-- race-iq.js
|   |-- coach.js
|   |-- gemini.js
|   |-- strava.js
|   |-- ics.js
|   `-- settings.js
|-- pwa/
|   `-- runtime.js
`-- react/
    `-- foundation.js
```

Observacao: essa estrutura e plano de destino, nao obrigacao de criar tudo em um commit.

## Ordem de extracao recomendada

### Fase 0 - Baseline e protecao

Objetivo: preparar terreno sem mudar comportamento.

Extrair/introduzir:

- Lista de contratos globais.
- Checklist manual de regressao.
- Facade global planejada.
- Mapa de IDs DOM.

Dependencias:

- `contract-freeze.md`.
- `contract-inventory.md`.

Pode ser extraido sem risco:

- Nenhum comportamento ainda; apenas preparacao.

Nao extrair inicialmente:

- Firebase Auth.
- `save()`.
- Planner.
- Strava callback.
- Service worker.

### Fase 1 - Utils puros

Objetivo: extrair funcoes sem side effects.

Modulos candidatos:

- `dates`: `today`, `formatDate`, `daysBetween`, `weekStart`, `monthStart`.
- `pace`: `paceToSec`, `secToPace`, `secToTime`.
- `workout-labels`: `typeLabel`, `typeChipClass`.
- `ics helpers` somente helpers puros, nao download ainda.

Dependencias:

- Nenhuma dependencia de DOM.
- Algumas funcoes leem `state` indiretamente hoje; extrair somente as puras reais primeiro.

Pode ser extraido sem risco:

- Calculo de datas.
- Conversao de pace/tempo.
- Escape ICS puro.

Nao extrair inicialmente:

- `isWorkDay`, se ainda depender de `state.config.scaleStart` global sem adapter.
- Renderizadores.
- Funcoes que chamam `save()`.

Compatibilidade:

- Reexpor funcoes globais originais.
- Garantir que chamadas antigas retornem exatamente o mesmo formato.

### Fase 2 - DOM IDs e UI primitives

Objetivo: centralizar seletores sem renomear nada.

Modulos candidatos:

- `dom-ids.js`: mapa de IDs congelados.
- `ui/toast.js`: `showToast`.
- `ui/modal.js`: `openModal`, `closeModal`.
- `ui/overflow.js`: `toggleOverflow`, `closeOverflow`.

Dependencias:

- DOM existente.
- IDs congelados.

Pode ser extraido sem risco:

- Wrappers que chamam `document.getElementById` com IDs atuais.
- Funcoes pequenas de UI sem mexer em markup.

Nao extrair inicialmente:

- Drawer completo.
- Modais com logica de workout.
- Renderizadores de telas.

Compatibilidade:

- `window.openModal`, `window.closeModal`, `window.showToast`, `window.toggleOverflow`, `window.closeOverflow` continuam existindo.

### Fase 3 - State adapter sem mudanca de schema

Objetivo: encapsular acesso ao `state`, preservando o objeto global.

Modulos candidatos:

- `core/state.js`.
- `core/workout-model.js` com helpers `isCompleted`, `isPlanned`.

Dependencias:

- Shape atual de `state`.
- `state.workouts` congelado.

Pode ser extraido sem risco:

- Getters/setters que ainda operam sobre o mesmo objeto `state`.
- Helpers de leitura de workouts.

Nao extrair inicialmente:

- Normalizacao de `workouts`.
- Migracao de schema.
- Troca de `state` global por store React.

Compatibilidade:

- `window.state` ou equivalente global deve continuar disponivel se o codigo restante depender disso.
- Funcoes antigas continuam lendo/escrevendo o mesmo objeto.

### Fase 4 - Storage local e `save()` adapter

Objetivo: separar localStorage sem alterar comportamento.

Modulos candidatos:

- `storage/local-storage.js`.
- `storage/keys.js`.

Dependencias:

- `state` adapter.
- Chaves congeladas.
- `getDbKey`, `getStravaKey`, `getStravaCidKey`, `getStravaSecKey`.

Pode ser extraido sem risco:

- Funcoes de chave.
- `load()` local.
- Parte local de `save()`.

Nao extrair inicialmente:

- Upload cloud dentro do mesmo commit.
- Migracao de chaves.

Compatibilidade:

- `save()` global deve continuar: localStorage + upload cloud se logado/online.
- `load()` deve manter fallback UID -> legacy.
### Fase 5 - Cloud Sync adapter

Objetivo: isolar Firestore mantendo `window._fb*`.

Modulos candidatos:

- `integrations/firebase.js`.
- `sync/cloud-sync.js`.
- `auth/firebase-auth.js`.

Dependencias:

- `window._fb*` ou adapter equivalente.
- `state.user`.
- `save()` adapter.
- `buildCloudPayload()` congelado.

Pode ser extraido sem risco:

- `buildCloudPayload()` sem alterar campos.
- `uploadToCloud()` e `downloadFromCloud()` mantendo chamadas existentes.
- `setSyncStatus()` se IDs forem preservados.

Nao extrair inicialmente:

- Alterar provider Auth.
- Alterar Firestore path.
- Alterar merge de payload.
- Alterar migracao legacy.

Compatibilidade:

- Manter `window._fbAuth`, `_fbDb`, `_fbDoc`, `_fbSetDoc`, `_fbGetDoc`, `_fbGoogleProvider`.
- Manter `firebaseLogin`, `firebaseLogout`, `syncNow` globais.

### Fase 6 - ICS Export

Objetivo: extrair feature de baixo acoplamento relativo depois do workout adapter.

Modulos candidatos:

- `features/ics.js`.

Dependencias:

- Workout model atual.
- Date/pace utils.
- `isWorkDay`.
- `typeLabel`.

Pode ser extraido sem risco:

- `generateICS(workouts)`.
- `downloadICS` mantendo Blob/download.
- Exports globais existentes.

Nao extrair inicialmente:

- Mudanca de formato ICS.
- Mudanca de nomes de arquivos.

Compatibilidade:

- `exportCurrentWeek`, `exportNextWeekToCalendar`, `exportWeekToCalendar`, `exportMonthToCalendar` globais.

### Fase 7 - Race IQ

Objetivo: isolar calculos e renderizacao de Race IQ.

Modulos candidatos:

- `features/race-iq.js`.

Dependencias:

- `state.workouts`.
- `paceToSec`, `secToTime`, `formatDate`, `typeLabel`.
- IDs Race IQ congelados.

Pode ser extraido sem risco:

- Helper de filtro de longoes reais.
- Helper de previsao.
- Render atual preservado.

Nao extrair inicialmente:

- Alterar formula.
- Alterar alvo fixo `3h58`.

Compatibilidade:

- `renderRaceIQ()` global.
- `goTo('sec-race')` continua chamando render.

### Fase 8 - Gemini e Coach sem React

Objetivo: separar integracao Gemini de UI do Coach, mantendo chat atual.

Modulos candidatos:

- `integrations/gemini.js`.
- `features/coach-context.js`.
- `features/coach-ui.js`.

Dependencias:

- `state`.
- `save()`.
- localStorage key `pacemaker_gemini_key`.
- IDs Coach/Gemini.

Pode ser extraido sem risco:

- `getGeminiKey`, `hasGeminiKey`.
- `buildCoachContext`.
- `buildSystemPrompt`.
- `sendToGemini` se facade mantiver nomes.

Nao extrair inicialmente:

- Alterar modelo Gemini.
- Alterar safety settings.
- Alterar storage da key.
- Reactificar chat.

Compatibilidade:

- `sendCoach`, `quickMsg`, `saveGeminiKey`, `clearGeminiKey`, `toggleGeminiKeyVisibility` globais.

### Fase 9 - Strava

Objetivo: extrair OAuth/importacao preservando callback de boot.

Modulos candidatos:

- `integrations/strava.js`.

Dependencias:

- localStorage Strava keys.
- `state.stravaConfig`.
- `state.workouts`.
- `save()`.
- IDs Strava.
- `window.location`, `window.history`.

Pode ser extraido sem risco:

- Token helpers.
- Type mapping.
- Render de modal de importacao preservado.

Nao extrair inicialmente:

- Trocar OAuth por backend.
- Remover prompt de Client Secret.
- Alterar escopo `activity:read_all`.

Compatibilidade:

- `handleStravaCallback()` deve continuar chamado antes do primeiro render.
- Funcoes Strava globais preservadas.

### Fase 10 - Planner e Log

Objetivo: extrair os modulos mais acoplados por ultimo.

Modulos candidatos:

- `features/log.js`.
- `features/planner.js`.
- `features/day-drawer.js`.
- `features/workout-modal.js`.

Dependencias:

- Quase tudo: state, storage, utils, DOM IDs, save, render, ICS, Coach, Race IQ.

Pode ser extraido sem risco:

- Pequenos helpers puros de planejamento.
- Rotacao de musculacao.
- Distribuicao semanal como funcao pura com fixtures.

Nao extrair inicialmente:

- `saveWorkout()` override sem teste manual.
- `confirmPlan()` e `pendingPlan` antes de adapters estaveis.
- Drawer antes de Log e Planner estarem isolados.

Compatibilidade:

- Preservar `state.workouts` e todos os handlers globais.
- Preservar IDs dinamicos `wi-${w.id}`.

### Fase 11 - PWA runtime

Objetivo: apenas documentar ou isolar runtime, sem mudar escopo no primeiro ciclo.

Modulos candidatos:

- `pwa/runtime.js`.

Dependencias:

- Head/document.
- Service worker API.
- Cache name `pacemaker-v2`.

Pode ser extraido sem risco:

- Criacao de manifest Blob para funcao chamada no boot.
- Registro de SW Blob como esta.

Nao extrair inicialmente:

- Mover para `manifest.webmanifest` e `sw.js` sem plano de lifecycle.

Compatibilidade:

- Mesmo manifest, mesmos icones, mesmo cache name.

### Fase 12 - React Foundation

Objetivo: instalar base React sem tomar controle do app.

Modulos candidatos:

- `react/foundation.js`.
- `react/compat-bridge.js`.

Dependencias:

- Facade global.
- State adapter.
- DOM preservado.

Pode ser extraido sem risco:

- Uma ilha React isolada em container novo, se houver container dedicado.
- Dev tooling ou estrutura de projeto, se nao alterar app shell.

Nao extrair inicialmente:

- Bottom nav.
- Planner.
- Log.
- Coach.
- App root inteiro.

Compatibilidade:

- React nao deve renderizar por cima dos IDs existentes.
- Vanilla continua owner da UI ate uma migracao por tela.

## O que pode ser extraido sem risco relativo

- Date/time utils puros.
- Pace/time conversion.
- Labels de tipo, se nao dependerem de DOM.
- `icsEscape`, `icsDateTime`, `icsEndDateTime`.
- Mapa de IDs.
- Toast/modal simples.
- Chaves localStorage como constantes/adapters.
- Helpers de filtro de workouts, desde que preservem shape.

## O que NAO pode ser extraido inicialmente

- `save()` sem adapter global.
- Firebase Auth sem preservar `window._fb*` e boot order.
- `handleStravaCallback()` fora da ordem de inicializacao.
- `state.workouts` para novo schema.
- Planner completo.
- Log completo.
- Drawer completo.
- Service worker para arquivo real.
- App shell para React.
- IDs DOM ou handlers inline.

## Estrategia de compatibilidade

### Facade global recomendada

Criar uma facade temporaria que publique todos os contratos congelados:

```text
window.Pacemaker = {
  state,
  utils,
  storage,
  auth,
  sync,
  strava,
  gemini,
  planner,
  raceIq,
  ics,
  ui
}
```

Mas manter tambem os nomes globais diretos:

```text
window.goTo
window.save
window.saveWorkout
window.firebaseLogin
window.stravaSync
window.sendCoach
window.renderDashboard
...
```

A facade ajuda a modularizacao; os nomes globais diretos protegem o HTML atual.

### Adapters temporarios necessarios

- `global-facade`: reexpoe funcoes chamadas pelo HTML.
- `state-adapter`: preserva objeto `state` atual.
- `storage-adapter`: preserva `getDbKey`, `load`, `save` e chaves.
- `firebase-window-adapter`: preserva `window._fb*`.
- `dom-adapter`: centraliza IDs sem renomear.
- `workout-adapter`: preserva shape de `state.workouts`.
- `render-adapter`: mantem chamadas `renderDashboard(); renderLog(); renderPlanner();`.
- `pwa-adapter`: mantem manifest/SW Blob atual enquanto nao houver migracao real.
## Sequencia de commits sugerida

### Commit 1 - Docs and regression checklist

Conteudo:

- Adicionar checklist manual de regressao.
- Confirmar contract freeze como referencia.

Risco: Baixo

Validacao:

- Nenhuma mudanca funcional.

### Commit 2 - Global facade skeleton

Conteudo:

- Criar facade que aponta para funcoes atuais sem mover implementacao relevante.
- Reexpor nomes globais obrigatorios.

Risco: Medio

Validacao:

- Todos os handlers inline continuam funcionando.

### Commit 3 - Utils: dates and pace

Conteudo:

- Extrair `today`, `formatDate`, `daysBetween`, `weekStart`, `monthStart`, `paceToSec`, `secToPace`, `secToTime`.

Risco: Baixo

Validacao:

- Dashboard, Planner, Race IQ e ICS continuam com datas/tempos iguais.

### Commit 4 - UI primitives: toast, modal, overflow

Conteudo:

- Extrair `showToast`, `openModal`, `closeModal`, `toggleOverflow`, `closeOverflow`.

Risco: Medio

Validacao:

- Modais, toast e menus overflow em Planner funcionam.

### Commit 5 - DOM IDs map

Conteudo:

- Criar mapa de IDs congelados e usar apenas em wrappers novos.
- Nao renomear HTML.

Risco: Baixo

Validacao:

- Verificar existencia de todos os IDs obrigatorios.

### Commit 6 - State and workout adapter

Conteudo:

- Encapsular `state` sem alterar shape.
- Extrair `isCompleted`, `isPlanned` e helpers de leitura.

Risco: Medio

Validacao:

- Log, Planner, Race IQ, Coach e Dashboard leem mesmos dados.

### Commit 7 - Storage keys and local load/save local part

Conteudo:

- Extrair chaves localStorage.
- Preservar `load()` e `getDbKey()`.
- Preparar wrapper `save()` sem alterar cloud.

Risco: Alto

Validacao:

- Criar treino, recarregar, validar localStorage.
- Testar usuario logado/deslogado.

### Commit 8 - Cloud Sync adapter

Conteudo:

- Extrair `buildCloudPayload`, `uploadToCloud`, `downloadFromCloud`, `syncNow`, `checkMigration`.
- Manter `window._fb*`.

Risco: Critico

Validacao:

- Login, upload, download, migration, offline/online.

### Commit 9 - ICS module

Conteudo:

- Extrair geracao/download ICS.

Risco: Medio

Validacao:

- Exportar semana atual, proxima semana e mes.

### Commit 10 - Race IQ module

Conteudo:

- Extrair calculo e render de Race IQ.

Risco: Alto

Validacao:

- Longoes reais entram; planejados nao entram.

### Commit 11 - Gemini/Coach service layer

Conteudo:

- Extrair key management, prompt/context e chamada Gemini.
- Manter UI Coach atual.

Risco: Alto

Validacao:

- Coach offline, Gemini valido, Gemini invalido, fallback de rede.

### Commit 12 - Strava module

Conteudo:

- Extrair OAuth, token helpers, sync e importacao.
- Manter callback no boot.

Risco: Alto

Validacao:

- Conectar, callback, sync, importar, deduplicar.

### Commit 13 - Planner pure helpers

Conteudo:

- Extrair somente calculos puros de planejamento.
- Manter render e handlers atuais.

Risco: Alto

Validacao:

- Preview, confirm, conservative plan, clear week, rebalance.

### Commit 14 - Log and workout modal helpers

Conteudo:

- Extrair helpers nao destrutivos.
- Preservar `saveWorkout()` global.

Risco: Alto

Validacao:

- Criar, editar, excluir, restaurar e completar planejado.

### Commit 15 - React Foundation isolated

Conteudo:

- Adicionar base React isolada, sem substituir app atual.
- Criar bridge para futuro consumo de `state`.

Risco: Medio

Validacao:

- App Vanilla continua funcionando integralmente.
- React nao altera IDs existentes.

### Commit 16 - PWA runtime wrapper

Conteudo:

- Se necessario, isolar criacao de manifest/SW Blob em funcao chamada no boot.
- Nao mudar escopo/cache.

Risco: Alto

Validacao:

- Manifest, installability, service worker e offline.

## Ordem de migracao por dependencia

```text
utils -> ui primitives -> state adapter -> storage -> cloud sync
      -> ics -> race iq -> gemini/coach -> strava -> planner/log
      -> react foundation -> pwa runtime formalization
```

## Gates obrigatorios por commit

Antes de cada commit estrutural:

- App carrega sem erro de console.
- `renderDashboard()` roda.
- Nav funciona.
- Modal de treino abre.
- `save()` persiste localmente.
- IDs obrigatorios continuam presentes.

Antes de qualquer commit que toque sync/auth:

- Login Google funciona.
- Logout funciona.
- Upload manual funciona.
- Reload apos login preserva dados.

Antes de qualquer commit que toque workouts:

- Treino manual persiste.
- Plano e confirmado.
- Planejado vira concluido.
- Race IQ ignora planejados.
- ICS exporta planejados/reais esperados.

## Resultado esperado da v0.8.5

Ao fim da v0.8.5, o Pacemaker deve ter uma base modular preparada para React, mas ainda compativel com a UI Vanilla atual. A entrega ideal e uma fundacao tecnica segura: modulos, adapters, facade global, state/storage estabilizados e zero regressao nos fluxos criticos.
