# Pacemaker v0.8.5 - Migration Risk Register

Fonte oficial: `docs/contract-inventory.md` e `docs/contract-freeze.md`.

Objetivo: registrar os riscos da v0.8.5 (React Foundation) antes de qualquer alteracao estrutural no `index.html`.

## Executive Summary

A v0.8.5 deve ser tratada como uma migracao de compatibilidade, nao como uma reescrita. O Pacemaker v0.8.2 funciona como uma PWA single-file onde HTML, CSS, estado, renderizacao, persistencia, sync, Firebase, Gemini, Strava, Planner, Race IQ, PWA e ICS coexistem no mesmo `index.html`.

Os maiores riscos estao nos contratos implicitos: funcoes globais chamadas por handlers inline, IDs DOM usados como API, `state.workouts` como modelo compartilhado, `save()` como ponto unico de persistencia/sync e a ordem de inicializacao Firebase -> state -> load -> Strava callback -> render.

A estrategia recomendada e modularizar primeiro por extracao conservadora, mantendo uma facade global temporaria. React deve entrar como fundacao progressiva, inicialmente sem assumir o controle dos fluxos criticos.

## Riscos Criticos

### Risco 1 - Quebra dos handlers inline globais

Classificacao: Critico

Impacto: botoes, modais, nav, Planner, Coach, Strava, Gemini e exportacoes podem parar imediatamente se as funcoes deixarem de existir no escopo global.

Probabilidade: Alta

Como detectar:

- Console com `ReferenceError: <funcao> is not defined`.
- Cliques que nao produzem resposta.
- Modais que nao abrem ou botoes de salvar/exportar sem efeito.

Como testar:

- Clicar em todas as abas da bottom nav.
- Abrir e fechar modal de treino.
- Abrir Coach e enviar mensagem.
- Abrir parametros do Planner e preview.
- Abrir Strava settings, Gemini settings e menus overflow.

Estrategia de mitigacao:

- Criar facade temporaria reexpondo funcoes em `window`.
- Nao remover `onclick`, `oninput` ou handlers em `innerHTML` na primeira fase.
- Antes de extrair cada modulo, listar as funcoes globais consumidas por HTML.

### Risco 2 - Quebra da ordem de inicializacao Firebase/state

Classificacao: Critico

Impacto: login, auth state, cloud sync e migracao podem falhar se `onAuthStateChanged` tentar acessar `state` antes dele existir.

Probabilidade: Media

Como detectar:

- Console com erro `state is not defined`.
- UI de login nao atualiza apos autenticar.
- `state.user` fica `null` apos login.
- Sync nao inicia depois de autenticar.

Como testar:

- Abrir app deslogado.
- Fazer login Google.
- Recarregar app ja logado.
- Fazer logout.
- Repetir com rede offline/online.

Estrategia de mitigacao:

- Garantir que bootstrap de state aconteca antes do listener mutar estado.
- Se Firebase virar modulo, expor init explicito chamado apos state existir.
- Manter `window._fb*` durante a transicao.

### Risco 3 - Alteracao semantica de `save()`

Classificacao: Critico

Impacto: perda de dados locais, sync incompleto, upload duplicado, UI stale ou falha de migracao UID-scoped.

Probabilidade: Alta

Como detectar:

- Treinos salvos desaparecem apos reload.
- Alteracoes locais nao chegam ao Firestore.
- `sync-status-text` fica incorreto.
- Dados salvos em chave errada de localStorage.

Como testar:

- Criar treino manual, recarregar e validar persistencia.
- Criar treino logado e validar sync manual.
- Alterar config e validar localStorage.
- Importar Strava e validar persistencia.
- Completar treino planejado e validar rebalanceamento apos reload.

Estrategia de mitigacao:

- Preservar `save()` como API publica interna.
- Separar internamente em `saveLocal` e `uploadToCloud`, mas manter wrapper com comportamento atual.
- Nunca mudar `getDbKey()` durante v0.8.5.

### Risco 4 - Quebra de `state.workouts`

Classificacao: Critico

Impacto: Dashboard, Log, Planner, Race IQ, Strava, ICS e Coach podem divergir ou interpretar treinos incorretamente.

Probabilidade: Alta

Como detectar:

- Treinos planejados aparecem como concluidos.
- Race IQ usa treino planejado como dado real.
- ICS exporta eventos errados.
- Strava duplica atividades.
- Planner perde plano ao completar treino.

Como testar:

- Criar treino real manual.
- Gerar plano para proxima semana.
- Completar treino planejado.
- Excluir treino concluido e restaurar como planejado.
- Importar atividade Strava e tentar importar novamente.
- Abrir Race IQ com longoes reais e planejados.

Estrategia de mitigacao:

- Congelar shape atual de workout.
- Criar helpers de leitura sem normalizar destrutivamente.
- Evitar migracao de schema na v0.8.5.
- Adicionar adapter para `planned`, `missed`, `adjusted_from`, `origin_plan_date`, `stravaId`, `muscle_group`, `steps`.

### Risco 5 - Quebra de Cloud Sync Firestore

Classificacao: Critico

Impacto: dados podem nao sincronizar entre dispositivos, sobrescrever dados remotos ou perder Gemini/Strava metadata.

Probabilidade: Media

Como detectar:

- Firestore nao recebe `updatedAt` novo.
- Download troca arrays inesperadamente.
- Config local e remota divergem.
- Strava Client ID nao reaparece em novo dispositivo.
- Gemini key nao restaura apos login.

Como testar:

- Login com usuario existente.
- Alterar config, salvar, sincronizar e recarregar.
- Simular dados em `pacemaker_v2` e migrar.
- Validar payload `users/{uid}` com `schemaVersion`, `config`, `workouts`, `athleteProfile`, `stravaConfig`, `geminiKeyEncrypted`.

Estrategia de mitigacao:

- Nao alterar `buildCloudPayload()` inicialmente.
- Manter `users/{uid}` e `setDoc(..., { merge: true })`.
- Isolar cloud em modulo somente depois de congelar storage adapter.

### Risco 6 - Exposicao ou perda de segredos Gemini/Strava

Classificacao: Critico

Impacto: API key Gemini ou Strava Client Secret podem vazar para Firestore, logs, README, estado compartilhado ou UI indevida.

Probabilidade: Media

Como detectar:

- `client_secret` dentro de `state` ou `buildCloudPayload()`.
- Gemini key em payload sem `geminiKeyEncrypted`.
- Logs de erro contendo key ou secret.

Como testar:

- Salvar Gemini key e inspecionar localStorage e payload cloud.
- Conectar Strava e validar que tokens/secret ficam apenas em localStorage.
- Buscar por `secret`, `access_token`, `pacemaker_gemini_key` em payloads novos.

Estrategia de mitigacao:

- Manter tokens Strava e secret fora de `state.stravaConfig`.
- Manter Gemini key local e ofuscada no cloud enquanto nao houver backend.
- Nunca logar keys/tokens.
### Risco 7 - Quebra do OAuth Strava durante modularizacao

Classificacao: Alto

Impacto: usuario nao consegue conectar, trocar code por token, renovar sessao ou importar atividades.

Probabilidade: Media

Como detectar:

- Callback retorna com `code`, mas nada acontece.
- URL nao e limpa apos callback.
- Modal de importacao nao abre.
- `strava-last-sync` nao atualiza.
- Atividades duplicadas.

Como testar:

- Fluxo completo `stravaConnect()` -> callback -> prompt secret -> token.
- Refresh token com token expirado.
- Sync de ultimos 60 dias.
- Selecionar uma atividade, importar e tentar importar de novo.

Estrategia de mitigacao:

- Manter `handleStravaCallback()` no boot antes de `renderDashboard()`.
- Preservar chaves localStorage Strava com e sem UID.
- Nao trocar OAuth para PKCE/backend na v0.8.5.
- Criar modulo Strava somente apos facade global estar ativa.

### Risco 8 - Quebra do Coach Gemini

Classificacao: Alto

Impacto: Coach deixa de responder, perde contexto do atleta, consome historico errado ou ignora fallback offline.

Probabilidade: Media

Como detectar:

- `sendCoach()` nao adiciona mensagens.
- Typing indicator fica preso.
- Erro Gemini nao remove API key invalida.
- Resposta offline nao salva em `chatHistory`.

Como testar:

- Enviar mensagem sem Gemini key.
- Salvar key valida/invalida.
- Enviar mensagem online com key.
- Simular falha de rede e validar fallback.
- Limpar historico e validar mensagem inicial.

Estrategia de mitigacao:

- Extrair primeiro helpers puros de contexto, nao UI.
- Manter `state.chatHistory` local e preservado por `save()`.
- Preservar `buildSystemPrompt()` antes de refinar prompt.
- Nao mudar endpoint/modelo na v0.8.5.

### Risco 9 - Quebra do Planner e da regra de proxima semana

Classificacao: Alto

Impacto: planos podem cair na semana errada, substituir treinos errados, perder rebalanceamento ou gerar calendario inconsistente.

Probabilidade: Alta

Como detectar:

- Preview mostra uma semana e card mostra outra.
- `confirmPlan()` remove treinos fora da semana alvo.
- Drawer nao completa planejado.
- Distancias nao batem com meta.

Como testar:

- Gerar plano em diferentes dias da semana.
- Confirmar plano e abrir Planner.
- Limpar semana atual e proxima semana.
- Gerar plano conservador.
- Editar treino no drawer com rebalanceamento ligado.

Estrategia de mitigacao:

- Preservar `previewWeekPlan()` sempre mirando proxima semana na v0.8.5.
- Extrair calculos de data antes da UI.
- Nao normalizar `pendingPlan` inicialmente.
- Manter renderizadores existentes ate testes cobrirem calendario.

### Risco 10 - Quebra do Race IQ

Classificacao: Alto

Impacto: previsao pode usar dados planejados ou invalidos, exibindo desempenho falso.

Probabilidade: Media

Como detectar:

- Race IQ muda apos criar plano sem treinos reais.
- Longao planejado aparece na lista de historico.
- Resultado diverge do Dashboard.
- Origem Strava/manual incorreta.

Como testar:

- Criar longao real com pace.
- Criar longao planejado com pace e validar que nao entra.
- Importar longao Strava e validar badge/origem.
- Validar alvo fixo 3h58 e formula atual.

Estrategia de mitigacao:

- Extrair formula como helper puro com testes de fixture.
- Preservar filtro `type==='long' && !planned && dist>0 && pace valido`.
- Nao mudar targetSec nem fator `1.055` na v0.8.5.

### Risco 11 - Quebra da PWA / service worker

Classificacao: Alto

Impacto: instalabilidade, cache, reload offline ou escopo do service worker podem falhar ou ficar presos em versao antiga.

Probabilidade: Media

Como detectar:

- Manifest nao aparece nas DevTools.
- App nao instala.
- Service worker antigo continua controlando a pagina.
- Offline mostra tela quebrada.

Como testar:

- Validar manifest e icones.
- Registrar service worker em aba limpa.
- Recarregar offline.
- Verificar cache `pacemaker-v2`.
- Atualizar app e validar lifecycle.

Estrategia de mitigacao:

- Nao mover manifest/SW no primeiro commit de modularizacao.
- Se mover para arquivos reais, criar plano de versao/escopo/cache.
- Manter `pacemaker-v2` documentado e tratar SW antigo.

### Risco 12 - Quebra do ICS Export

Classificacao: Medio

Impacto: usuario perde exportacao de calendario ou recebe eventos com data/duracao errada.

Probabilidade: Media

Como detectar:

- Arquivo `.ics` nao baixa.
- Calendario nao importa eventos.
- Eventos sem `DTSTART`/`DTEND` correto.
- Treinos strength/run geram titulo errado.

Como testar:

- Exportar semana atual.
- Exportar proxima semana.
- Exportar mes.
- Abrir arquivo gerado em app de calendario.
- Validar treino com `steps` e `notes`.

Estrategia de mitigacao:

- Extrair ICS tarde, pois depende de workout model.
- Preservar API `generateICS(workouts)`.
- Criar fixtures de workouts reais/planejados/strength.

### Risco 13 - Quebra dos IDs DOM como API interna

Classificacao: Alto

Impacto: renderizadores deixam de encontrar elementos e falham silenciosamente ou com `Cannot set property of null`.

Probabilidade: Alta

Como detectar:

- Console com `Cannot read properties of null`.
- Cards vazios.
- Modais incompletos.
- Campos settings nao carregam.

Como testar:

- Rodar checklist visual de todas as telas.
- Abrir Settings e validar todos os campos.
- Abrir modal de treino run/strength.
- Abrir Planner, Race IQ, Coach e Strava modal.

Estrategia de mitigacao:

- Criar `dom-ids` ou mapa de seletores sem renomear IDs.
- Nao alterar markup inicialmente.
- Validar existencia dos IDs obrigatorios antes de cada commit estrutural.

### Risco 14 - Quebra de `window._fb*`

Classificacao: Alto

Impacto: `firebaseLogin`, `uploadToCloud`, `downloadFromCloud` e Auth UI podem parar.

Probabilidade: Media

Como detectar:

- Toast `Firebase nao configurado` mesmo com config existente.
- Login nao abre popup.
- Upload/download retorna antes de executar.

Como testar:

- Validar `window._fbAuth`, `_fbDb`, `_fbDoc`, `_fbSetDoc`, `_fbGetDoc`, `_fbGoogleProvider` no console.
- Fazer login, sync e logout.

Estrategia de mitigacao:

- Manter esses objetos expostos durante toda v0.8.5.
- Se Firebase virar modulo, criar adapter que publique os mesmos nomes.

### Risco 15 - Introduzir React controlando DOM antes da hora

Classificacao: Critico

Impacto: React pode sobrescrever elementos que o JS Vanilla espera, quebrando IDs, event listeners, modais e renderizadores.

Probabilidade: Media

Como detectar:

- Elementos somem apos mount React.
- Handlers inline param de funcionar.
- Estado visual diverge entre React e `state` global.

Como testar:

- Montar React em container isolado sem tocar nos IDs existentes.
- Navegar por todas as secoes apos mount.
- Verificar se `document.getElementById` ainda encontra todos os IDs congelados.

Estrategia de mitigacao:

- React Foundation deve comecar como ilha isolada ou infraestrutura, nao reescrita de telas.
- Nao substituir app shell na primeira fase.
- Manter DOM atual ate que cada tela tenha adapter e teste de regressao.

## Matriz resumida

| Area | Classificacao maxima | Motivo |
|---|---:|---|
| Handlers inline | Critico | API global do HTML atual |
| Firebase Auth | Critico | Boot e identidade do usuario |
| Cloud Sync / save() | Critico | Persistencia e sync |
| state.workouts | Critico | Modelo compartilhado por quase todas as features |
| React Foundation | Critico | Risco de takeover prematuro do DOM |
| Strava | Alto | OAuth + tokens locais + importacao |
| Gemini | Alto | Segredo local + chamada externa + fallback |
| Planner | Alto | Manipula planos, semanas e workouts |
| Race IQ | Alto | Depende de filtros semanticos do workout |
| PWA | Alto | Service worker/cache tem lifecycle proprio |
| ICS Export | Medio | Exportacao depende de workout shape |
| IDs DOM | Alto | Renderizadores dependem diretamente deles |
