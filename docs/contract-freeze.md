# Pacemaker - Contract Freeze v0.8.5

Objetivo: congelar os contratos que nao podem ser quebrados durante a modularizacao da v0.8.5.

Base: `docs/contract-inventory.md`.
Data: 2026-06-12.
Escopo: documentacao apenas; nenhum codigo deve ser alterado por este documento.

## Principio geral

A v0.8.5 deve modularizar preservando compatibilidade. O comportamento atual do app depende de contratos implicitos entre HTML, funcoes globais, IDs DOM, `state`, `localStorage`, Firebase, Strava, Gemini, PWA e ICS.

Durante a v0.8.5, qualquer extracao para modulos deve manter adaptadores temporarios para que o HTML atual continue funcionando ate que os handlers inline e renderizadores sejam migrados com seguranca.

## 1. Funcoes globais obrigatorias

As funcoes abaixo devem continuar acessiveis globalmente, seja como declaracoes globais, seja reexpostas via `window.<nome> = ...` apos modularizacao.

### Chamadas pelo HTML estatico ou por HTML gerado

- `openModal(id)`
- `closeModal(id)`
- `openLogFromPlan()`
- `goTo(sec)`
- `plannerNav(dir)`
- `clearCoachHistory()`
- `quickMsg(text)`
- `sendCoach()`
- `togglePlanSection()`
- `toggleRef()`
- `previewWeekPlan()`
- `firebaseLogin()`
- `firebaseLogout()`
- `syncNow()`
- `saveConfig()`
- `saveAthleteProfile()`
- `clearData()`
- `stravaConnect()`
- `stravaSync()`
- `stravaDisconnect()`
- `stravaSelectAll()`
- `stravaImportSelected()`
- `toggleStravaSelect(id)`
- `toggleGeminiKeyVisibility()`
- `saveGeminiKey()`
- `clearGeminiKey()`
- `showDrawerEdit()`
- `hideDrawerEdit()`
- `saveDrawerEdit()`
- `completeFromDrawer()`
- `selectParam(key, value, btn)`
- `applyParamsAndPreview()`
- `confirmPlan()`
- `previewConservativePlan()`
- `confirmConservativePlan()`
- `restoreStandardPreview()`
- `setModalMode(mode)`
- `selRpe(value)`
- `selFatigue(value)`
- `saveWorkout()`
- `deleteWorkout()`
- `editWorkout(id)`
- `deleteCompletedWorkout(id)`
- `deletePlannedWorkout(id)`
- `confirmDelete(id)`
- `toggleOverflow(id, event)`
- `closeOverflow(id)`
- `exportCurrentWeek()`
- `exportNextWeekToCalendar()`
- `exportWeekToCalendar()`
- `exportMonthToCalendar()`
- `confirmClearCurrentWeek()`
- `confirmClearNextWeek()`

### Funcoes de dominio usadas entre modulos

Estas podem migrar para modulos internos, mas seus contratos de entrada/saida devem permanecer equivalentes enquanto houver chamadas cruzadas:

- `load()`
- `save()`
- `getDbKey()`
- `today()`
- `formatDate(d)`
- `daysBetween(a, b)`
- `weekStart(d)`
- `monthStart()`
- `paceToSec(p)`
- `secToPace(s)`
- `secToTime(s)`
- `typeLabel(t, w)`
- `typeChipClass(t)`
- `showToast(msg)`
- `isWorkDay(dateStr)`
- `isCompleted(w)`
- `isPlanned(w)`
- `kmCompleted(dateFrom, dateTo)`
- `kmThisWeek()`
- `kmPlannedThisWeek()`
- `kmThisMonth()`
- `kmTotal()`
- `planAdherence()`
- `rebalanceAfterCompletion(completedDate, completedKm)`
- `predictMarathon()`
- `readinessScore()`
- `nextSuggestedWorkout()`
- `renderDashboard()`
- `renderLog()`
- `renderPlanner()`
- `renderRaceIQ()`
- `renderCoachContext()`
- `loadConfig()`

## 2. IDs DOM obrigatorios

Os IDs abaixo sao contrato entre HTML e JavaScript. Nao devem ser renomeados, removidos ou ter sua semantica alterada durante a v0.8.5 sem uma camada de compatibilidade.

### App e navegacao

- `app`
- `scroll-area`
- `toast`
- `header-countdown`
- `sec-dashboard`
- `sec-log`
- `sec-planner`
- `sec-race`
- `sec-coach`
- `sec-settings`
- `nav-dashboard`
- `nav-log`
- `nav-planner`
- `nav-race`
- `nav-coach`
- `nav-settings`

### Dashboard

- `db-days`
- `db-race-date`
- `db-week-km`
- `db-week-goal`
- `db-month-km`
- `db-total-km`
- `db-month-pct`
- `db-month-bar`
- `db-month-bar-text`
- `db-month-remain`
- `db-predicted`
- `db-sub4-bar`
- `db-sub4-badge`
- `db-gap-closed`
- `readiness-card`
- `readiness-val`
- `readiness-label`
- `ring-fill`
- `db-exec-card`
- `db-next-card`
- `db-next-title`
- `db-next-detail`
- `db-recent-list`

### Log e modal de treino

- `modal-log`
- `modal-log-title`
- `edit-workout-id`
- `mode-btn-run`
- `mode-btn-strength`
- `wf-section-type-run`
- `wf-fields-run`
- `wf-fields-strength`
- `wf-type`
- `wf-type-strength`
- `wf-date`
- `wf-dist`
- `wf-pace`
- `wf-hr`
- `wf-duration`
- `wf-muscle-group`
- `wf-strength-duration`
- `wf-strength-hr`
- `wf-notes`
- `wf-notes-label`
- `wf-rpe-row`
- `wf-fatigue-row`
- `delete-workout-btn`
- `log-list`
- `log-week-bar`
- `log-week-km-text`
- `log-week-goal-text`

### Planner e preview

- `planner-prev`
- `planner-next`
- `planner-month-label`
- `planner-cal-labels`
- `planner-grid`
- `planner-week-suggestion`
- `planner-next-week`
- `overflow-current`
- `overflow-next`
- `modal-params`
- `param-long`
- `param-long-val`
- `param-quality-row`
- `param-intensity-row`
- `param-priority-row`
- `param-workrun-row`
- `modal-preview`
- `preview-subtitle`
- `preview-list`
- `preview-summary`
- `preview-confirm-row`

### Race IQ

- `race-predicted`
- `race-basis`
- `race-gap-badge`
- `race-gap-bar`
- `race-gap-desc`
- `race-source-card`
- `race-longao-list`

### Coach

- `coach-ai-badge`
- `coach-context-box`
- `coach-sugs`
- `chat-msgs`
- `chat-input`
- `plan-collapsible-header`
- `plan-collapsible-body`
- `plan-km-goal`
- `plan-km-suggestion`
- `plan-week-target-label`
- `plan-feeling`
- `plan-notes`
- `toggle-ref`

### Day drawer

- `drawer-day`
- `dd-date`
- `dd-title`
- `dd-badges`
- `dd-steps`
- `dd-steps-section`
- `dd-notes`
- `dd-notes-section`
- `dd-complete-btn`
- `dd-delete-btn`
- `dd-delete-planned-btn`
- `dd-view-mode`
- `dd-edit-mode`
- `dd-edit-type`
- `dd-edit-dist`
- `dd-edit-pace`
- `dd-edit-notes`
- `toggle-rebalance`

### Auth, settings, Gemini e Strava

- `auth-card`
- `auth-logged-out`
- `auth-logged-in`
- `auth-name`
- `auth-email`
- `auth-avatar`
- `sync-indicator`
- `sync-status-text`
- `cfg-race-date`
- `cfg-race-name`
- `cfg-month-goal`
- `cfg-week-goal`
- `cfg-scale-start`
- `cfg-name`
- `cfg-weight`
- `cfg-height`
- `cfg-ap-goal`
- `cfg-ap-target-time`
- `cfg-ap-strength-pref`
- `cfg-ap-longrun-pref`
- `cfg-ap-injuries`
- `cfg-ap-notes`
- `gemini-badge`
- `cfg-gemini-key`
- `gemini-key-eye`
- `gemini-key-status`
- `strava-badge`
- `cfg-strava-id`
- `strava-status`
- `strava-connect-row`
- `strava-connect-btn`
- `strava-connected-row`
- `strava-last-sync`
- `modal-strava`
- `strava-import-subtitle`
- `strava-import-btn`
- `strava-activity-list`

### IDs dinamicos que devem continuar no mesmo formato

- `wi-${w.id}` para itens de treino.
- `sa-${a.id}` para atividades Strava.
- `coach-insights` para bloco de insights criado em runtime.
- `typing-indicator` para indicador de digitacao do Coach.
- `nav-${sec.replace('sec-', '')}` para ativacao de navegacao.

## 3. Estrutura de `state`

A estrutura base de `state` deve continuar compativel com o formato abaixo:

```js
state = {
  config: {
    raceDate: '',
    raceName: 'Maratona',
    monthGoal: 190,
    weekGoal: 52,
    scaleStart: '',
    name: 'Caio',
    weight: 110,
    height: 175
  },
  workouts: [],
  chatHistory: [],
  athleteProfile: {
    goal: '',
    targetTime: '',
    injuryHistory: '',
    longRunPref: 0,
    strengthPref: 'ABC',
    notes: '',
    updatedAt: ''
  },
  user: null,
  stravaConfig: {
    clientId: '',
    connected: false,
    athlete: {}
  }
}
```

Contratos obrigatorios:

- `state.config` deve continuar alimentando Dashboard, Settings, Coach, Planner e Race IQ.
- `state.workouts` deve continuar sendo o array fonte para treinos reais, planejados, importados, perdidos e restaurados.
- `state.chatHistory` deve continuar local por padrao e nao deve entrar no payload Firestore atual.
- `state.athleteProfile` deve continuar alimentando Coach e Settings.
- `state.user` deve continuar sendo `null` ou `{ uid, displayName, email, photoURL }`.
- `state.stravaConfig` deve conter apenas metadados seguros sincronizaveis; tokens e secret devem permanecer fora dele.

## 4. Estrutura de `state.workouts`

Cada item de `state.workouts` deve continuar aceitando os campos abaixo. Nem todos sao obrigatorios para todos os tipos, mas os consumidores atuais assumem sua existencia ou ausencia.

```js
workout = {
  id: 'string',
  date: 'YYYY-MM-DD',
  type: 'z2 | interval | long | progressivo | tempo | strength | bike | swim | recovery',
  dist: 0,
  pace: '',
  hr: 0,
  duration: 0,
  rpe: 0,
  fatigue: 0,
  notes: '',
  planned: false,
  missed: false,
  adjusted_from: undefined,
  origin_plan_date: undefined,
  stravaId: undefined,
  muscle_group: undefined,
  steps: null
}
```

Contratos por origem/tipo:

- Treino real: `planned` ausente ou `false`, `missed` ausente ou `false`.
- Treino planejado: `planned: true`; usado por Planner, Drawer, Log, Dashboard e ICS.
- Treino perdido/removido: `missed: true`; deve ser ignorado por listas visiveis e calculos de execucao.
- Treino importado do Strava: `id` no formato `strava_${activityId}` e `stravaId` como string.
- Treino restaurado como planejado: `id` pode usar `plan_${date}_restored`.
- Treino de musculacao: `type: 'strength'`, `dist: 0`, pode conter `muscle_group`, `duration`, `hr` e `steps`.
- Treino com estrutura: `steps` deve continuar sendo array de objetos `{ icon, text, detail }` quando presente.

Consumidores sensiveis de `state.workouts`:

- Dashboard: volume, recentes, previsao e proximo treino.
- Log: lista visivel, swipe/edit/delete.
- Planner: calendario, planos, conclusao e rebalanceamento.
- Race IQ: longoes reais com `type='long'`, `!planned`, `dist`, `pace`.
- Strava: deduplicacao por `stravaId`.
- ICS: exportacao de treinos planejados/reais por data.
- Coach: contexto, historico recente, fadiga, longoes, volume e prontidao.

## 5. Chaves `localStorage`

As chaves abaixo nao podem ser renomeadas nem ter semantica alterada sem migracao explicita.

### Estado principal

- `pacemaker_v2`: estado legacy/fallback sem usuario autenticado.
- `pacemaker_${uid}`: estado principal escopado por usuario Firebase.

### Strava

- `pacemaker_strava`
- `pacemaker_strava_${uid}`
- `pacemaker_strava_cid`
- `pacemaker_strava_cid_${uid}`
- `pacemaker_strava_secret`
- `pacemaker_strava_secret_${uid}`

### Gemini

- `pacemaker_gemini_key`

### Migracao/limpeza

- `pacemaker_oai_key`: deve continuar removida no boot enquanto a migracao v0.8.2 for relevante.

Contrato especial:

- Tokens Strava e Client Secret ficam somente em `localStorage`.
- Gemini API key fica em `localStorage`; quando enviada ao Firestore, deve continuar passando por `geminiKeyToCloud()` enquanto nao houver mecanismo novo.
- `getDbKey()`, `getStravaKey()`, `getStravaCidKey()` e `getStravaSecKey()` devem preservar o comportamento UID-scoped atual.

## 6. Fluxos criticos que nao podem quebrar

### Login Google

- `firebaseLogin()` deve abrir login Google via Firebase Auth.
- `onAuthStateChanged` deve atualizar `state.user`.
- `renderAuthCard()` deve refletir login/logout.
- Login deve disparar `downloadFromCloud().then(() => checkMigration())`.
- Logout deve manter dados locais e limpar estado visual de sync.

### Cloud Sync

- `save()` deve persistir localmente e, quando logado/online, fazer upload assíncrono.
- `uploadToCloud()` deve gravar em `users/{uid}` com merge.
- `downloadFromCloud()` deve restaurar `config`, `workouts`, `athleteProfile`, `stravaConfig`, Strava Client ID e Gemini key ofuscada.
- `syncNow()` deve continuar sendo upload manual.
- Eventos `online`, `offline` e `visibilitychange` devem manter comportamento atual.
- `checkMigration()` deve preservar migracao `pacemaker_v2` para `pacemaker_${uid}`.

### Strava Sync

- `stravaConnect()` deve salvar Client ID e redirecionar para OAuth Strava.
- `handleStravaCallback()` deve processar `code`, limpar URL e trocar token.
- `exchangeStravaCode()` deve salvar tokens localmente e metadados seguros em `state.stravaConfig`.
- `refreshStravaToken()` deve renovar token antes da sync.
- `stravaSync()` deve buscar atividades recentes e abrir modal de importacao.
- `stravaImportSelected()` deve criar workouts sem duplicar `stravaId`.

### Coach Gemini

- `saveGeminiKey()` deve validar key com Gemini antes de salvar.
- `sendCoach()` deve escolher Gemini quando houver key e online, senao fallback offline.
- `sendToGemini()` deve preservar contexto do atleta, historico recente e regras do prompt.
- `renderCoachContext()` deve continuar gerando insights e mensagem inicial.
- `chatHistory` deve continuar salvo localmente via `save()`.

### Planner

- `renderPlanner()` deve continuar desenhando calendario mensal com escala trabalho/folga.
- `previewWeekPlan()` deve continuar gerando plano para a proxima semana.
- `confirmPlan()` deve substituir planejados da semana alvo e salvar novos `planned:true`.
- Plano conservador, limpeza de semana, edicao no drawer, conclusao de planejado e rebalanceamento devem continuar operando sobre `state.workouts`.

### Race IQ

- `renderRaceIQ()` deve usar somente longoes reais, nao planejados.
- Previsao deve continuar baseada nos longoes recentes com pace real.
- Fonte Strava/manual deve continuar inferida por `stravaId`.

### ICS

- Exportacao deve continuar manual via Blob `.ics`.
- `generateICS()` deve aceitar array de workouts no formato atual.
- Exports de semana atual, proxima semana, semana planejada e mes devem permanecer acessiveis.

## 7. Dependencias de inicializacao

A ordem abaixo e contrato de boot para a v0.8.5:

1. Meta tags, icones e fonts carregam no HTML.
2. Firebase module script importa SDKs e inicializa `fbApp`, `fbAuth`, `fbDb`.
3. Firebase expoe `window._fbAuth`, `window._fbDb`, `window._fbDoc`, `window._fbSetDoc`, `window._fbGetDoc`, `window._fbGoogleProvider`.
4. `onAuthStateChanged` e registrado.
5. Script principal declara `state`, funcoes e renderizadores.
6. `save()` passa a significar localStorage + sync cloud assíncrono.
7. Listeners globais sao registrados.
8. Manifest PWA e service worker sao criados/registrados.
9. `localStorage.removeItem('pacemaker_oai_key')` roda.
10. `load()` carrega estado local.
11. `handleStravaCallback()` roda antes do primeiro `renderDashboard()` quando existir.
12. `renderDashboard()` inicia a UI principal.
13. Outras telas renderizam sob demanda por `goTo(sec)` ou eventos de sync/auth.

Risco congelado:

- Se Firebase for modularizado de outro modo, o callback de auth nao pode depender de `state` antes dele existir.
- Se `save()` for movido, todas as chamadas existentes devem continuar acionando persistencia local e sync quando aplicavel.

## 8. Objetos expostos em `window`

Os objetos abaixo devem continuar disponiveis enquanto o script principal depender deles:

```js
window._fbAuth
window._fbDb
window._fbDoc
window._fbSetDoc
window._fbGetDoc
window._fbGoogleProvider
```

Outros contratos `window` existentes:

- `window.location.href` e usado no OAuth Strava.
- `window.location.search` e usado por `handleStravaCallback()`.
- `window.history.replaceState()` limpa callback Strava.
- `window._completingPlannedDate` e usado para transicao planejado -> concluido.

Contrato temporario recomendado:

- Durante a modularizacao, publicar uma facade explicita, por exemplo `window.Pacemaker`, pode ser aceitavel, mas os nomes globais atuais ainda precisam ser mantidos ate remover todos os handlers inline.

## 9. Contratos de compatibilidade temporaria para modularizacao

### Facade global

Enquanto o HTML ainda tiver handlers inline, cada funcao chamada por `onclick`, `oninput` ou template string deve ser reexposta globalmente.

Exemplo conceitual:

```js
window.goTo = navigation.goTo;
window.saveWorkout = workouts.saveWorkout;
window.stravaSync = strava.sync;
```

### DOM contract map

Criar modulos nao deve renomear IDs. Caso um modulo precise encapsular seletores, ele deve usar os IDs atuais como fonte de verdade.

### State adapter

Antes de normalizar dados, criar uma camada que leia e escreva o formato atual de `state`. A v0.8.5 nao deve exigir migracao destrutiva dos dados existentes.

### Save adapter

`save()` deve permanecer como API publica interna. Mesmo se houver `storage.saveLocal()` e `cloud.upload()`, a funcao global `save()` deve continuar fazendo o que faz hoje.

### Storage migration guard

Qualquer mudanca em chaves `localStorage` deve vir com migracao idempotente, preservando:

- `pacemaker_v2`
- `pacemaker_${uid}`
- chaves Strava com e sem UID
- `pacemaker_gemini_key`

### Cloud payload compatibility

`buildCloudPayload()` deve manter os campos atuais enquanto clientes antigos puderem existir:

- `schemaVersion`
- `updatedAt`
- `config`
- `workouts`
- `athleteProfile`
- `stravaConfig`
- `geminiKeyEncrypted`

### Workout model compatibility

Mesmo que surjam tipos internos mais ricos, os renderizadores e exportadores devem continuar recebendo workouts no shape atual ate que todos os consumidores sejam migrados.

### PWA compatibility

Se manifest ou service worker sairem de Blob para arquivo fisico, a v0.8.5 precisa tratar escopo, versao de cache e possivel service worker antigo `pacemaker-v2`.

### Integration compatibility

Firebase, Gemini e Strava devem ser isolados sem mudar seus contratos externos atuais:

- Firebase Auth via Google.
- Firestore em `users/{uid}`.
- Gemini `gemini-2.5-flash:generateContent` com key atual.
- Strava OAuth e activities API com tokens locais.

### Render compatibility

A primeira modularizacao deve preservar a estrategia de render atual:

- chamadas explicitas como `renderDashboard(); renderLog(); renderPlanner();`
- render sob demanda via `goTo(sec)`
- side effects de render apos sync, save, importacao e edicao

## Freeze decision

Para a v0.8.5, o contrato congelado e:

- Nao quebrar funcoes globais chamadas pelo HTML.
- Nao renomear IDs DOM.
- Nao alterar formato persistido de `state` sem migracao.
- Nao alterar semantica de `state.workouts`.
- Nao renomear chaves `localStorage`.
- Nao alterar comportamento de `save()`.
- Nao alterar ordem critica de inicializacao sem proteger `state`, Firebase e Strava callback.
- Nao remover `window._fb*` enquanto houver dependencias no script classico.
- Nao mover PWA/service worker sem estrategia de compatibilidade.
- Nao modularizar integracoes externas sem manter os fluxos criticos testaveis fim a fim.
