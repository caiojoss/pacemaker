# Pacemaker - Contract Inventory v0.8.5

Inventario tecnico do estado atual real do projeto antes da v0.8.5.

Data da analise: 2026-06-12.
Escopo: leitura do projeto em `C:\projetos\pacemaker`, sem refatoracao do app.

## 1. Estrutura atual do projeto

```text
C:\projetos\pacemaker
|-- .git/                         # repositorio Git local
|-- icon-192.png                   # icone PWA / apple-touch-icon, 26.984 bytes
|-- icon-512.png                   # icone PWA, 195.611 bytes
|-- index.html                     # aplicacao completa single-file, 218.199 bytes
|-- README.md                      # documentacao atual, 8.116 bytes
`-- docs/
    `-- contract-inventory.md      # este inventario
```

Observacoes estruturais:

- A aplicacao esta concentrada em `index.html`.
- O arquivo contem HTML, CSS, Firebase module script, script principal classico, PWA manifest dinamico e service worker dinamico.
- Nao existem arquivos JavaScript, CSS, manifest ou service worker separados na raiz.
- Nao ha `package.json`, bundler, pipeline de build ou dependencias locais versionadas alem dos assets estaticos.

## 2. Funcoes globais expostas ao HTML

Como o script principal e um `<script>` classico, as declaracoes `function` ficam no escopo global e podem ser chamadas por atributos inline, templates gerados por `innerHTML` e console. Alem disso, o script Firebase modular expos objetos em `window._fb*`.

### Chamadas diretamente por HTML inline ou HTML gerado

- `openModal('modal-log')`
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
- `syncNow()`
- `firebaseLogout()`
- `saveConfig()`
- `stravaConnect()`
- `stravaSync()`
- `stravaDisconnect()`
- `toggleGeminiKeyVisibility()`
- `saveGeminiKey()`
- `clearGeminiKey()`
- `saveAthleteProfile()`
- `clearData()` via `confirm(...) && clearData()`
- `showDrawerEdit()`
- `completeFromDrawer()`
- `hideDrawerEdit()`
- `saveDrawerEdit()`
- `closeModal(id)`
- `selectParam(key, value, btn)`
- `applyParamsAndPreview()`
- `confirmPlan()`
- `previewConservativePlan()`
- `stravaSelectAll()`
- `stravaImportSelected()`
- `setModalMode(mode)`
- `selRpe(value)`
- `selFatigue(value)`
- `saveWorkout()`
- `deleteWorkout()`
- `editWorkout(id)`
- `deleteCompletedWorkout(id)`
- `confirmDelete(id)`
- `toggleOverflow(id, event)`
- `closeOverflow(id)`
- `exportCurrentWeek()`
- `confirmClearCurrentWeek()`
- `exportNextWeekToCalendar()`
- `confirmClearNextWeek()`
- `confirmConservativePlan()`
- `restoreStandardPreview()`
- `toggleStravaSelect(id)`

### Objetos Firebase expostos em `window`

- `window._fbAuth`
- `window._fbDb`
- `window._fbDoc`
- `window._fbSetDoc`
- `window._fbGetDoc`
- `window._fbGoogleProvider`

### Outras funcoes globais declaradas no script principal

- Estado/persistencia: `getDbKey`, `load`, `save`, `buildCloudPayload`, `uploadToCloud`, `downloadFromCloud`, `checkMigration`, `setSyncStatus`, `renderSyncIndicator`.
- Utilitarios de data/metrica: `today`, `formatDate`, `daysBetween`, `weekStart`, `monthStart`, `paceToSec`, `secToPace`, `secToTime`, `typeLabel`, `typeChipClass`, `showToast`.
- Calculos de treino: `isWorkDay`, `isCompleted`, `isPlanned`, `kmCompleted`, `kmThisWeek`, `kmPlannedThisWeek`, `kmThisMonth`, `kmTotal`, `planAdherence`, `rebalanceAfterCompletion`, `markMissed`, `predictMarathon`, `readinessScore`, `nextSuggestedWorkout`.
- Renderizacao: `renderDashboard`, `renderLog`, `workoutItemHTML`, `renderPlanner`, `getCalDayContent`, `suggestForDay`, `renderPlannerSuggestion`, `renderNextWeekCard`, `renderRaceIQ`, `renderAuthCard`, `loadConfig`.
- Drawer/modal/log: `prepLogModal`, `deleteWorkout`, `closeDayDrawer`, `closeDrawer`, `closeDrawerPreview`, `openDayDrawer`, `showDrawerEdit`, `hideDrawerEdit`, `saveDrawerEdit`, `completeFromDrawer`, `openLogFromPlan`, `deletePlannedWorkout`.
- Coach/Gemini: `getGeminiKey`, `hasGeminiKey`, `loadGeminiKeyField`, `updateGeminiBadge`, `xorObfuscate`, `geminiKeyToCloud`, `geminiKeyFromCloud`, `buildSystemPrompt`, `sendToGemini`, `buildCoachContext`, `generateCoachInsights`, `renderCoachContext`, `renderChatMsgs`, `addTypingIndicator`, `removeTypingIndicator`, `sendMock`, `getMockReply`.
- Planner: `selectParam`, `applyParamsAndPreview`, `getNextStrengthSession`, `suggestWeekKm`, `balanceWeeklyLoad`, `previewWeekPlan`, `confirmPlan`, `generateWeekPlan`, `smartWorkDayDistribution`, `buildStepsFromType`, `getStrengthStepsForActive`, `confirmClearCurrentWeek`, `confirmClearNextWeek`, `clearWeekPlan`, `clearNextWeekPlan`, `exportCurrentWeek`, `exportNextWeekToCalendar`, `confirmConservativePlan`, `restoreStandardPreview`.
- Strava: `getStravaKey`, `getStravaCidKey`, `getStravaSecKey`, `getStravaTokens`, `setStravaTokens`, `clearStravaTokens`, `isStravaConnected`, `updateStravaBadge`, `showStravaStatus`, `handleStravaCallback`, `exchangeStravaCode`, `refreshStravaToken`, `stravaTypeToPM`, `detectRunType`, `secsToPaceStr`, `renderStravaImportModal`.
- ICS: `icsEscape`, `icsDateTime`, `icsEndDateTime`, `workoutDurationMin`, `workoutICSTitle`, `workoutICSDescription`, `generateICS`, `downloadICS`, `exportWeekToCalendar`, `exportMonthToCalendar`.

## 3. IDs do DOM utilizados pelo JavaScript

### IDs estaticos declarados no HTML e/ou acessados diretamente

- App/navigation: `app`, `scroll-area`, `toast`, `header-countdown`.
- Sections: `sec-dashboard`, `sec-log`, `sec-planner`, `sec-race`, `sec-coach`, `sec-settings`.
- Bottom nav: `nav-dashboard`, `nav-log`, `nav-planner`, `nav-race`, `nav-coach`, `nav-settings`.
- Dashboard: `db-days`, `db-race-date`, `db-week-km`, `db-week-goal`, `db-month-km`, `db-total-km`, `db-month-pct`, `db-month-bar`, `db-month-bar-text`, `db-month-remain`, `db-predicted`, `db-sub4-bar`, `db-sub4-badge`, `db-gap-closed`, `readiness-card`, `readiness-val`, `readiness-label`, `ring-fill`, `db-exec-card`, `db-next-card`, `db-next-title`, `db-next-detail`, `db-recent-list`.
- Log/workout modal: `modal-log`, `modal-log-title`, `edit-workout-id`, `mode-btn-run`, `mode-btn-strength`, `wf-section-type-run`, `wf-fields-run`, `wf-fields-strength`, `wf-type`, `wf-type-strength`, `wf-date`, `wf-dist`, `wf-pace`, `wf-hr`, `wf-duration`, `wf-muscle-group`, `wf-strength-duration`, `wf-strength-hr`, `wf-notes`, `wf-notes-label`, `wf-rpe-row`, `wf-fatigue-row`, `delete-workout-btn`, `log-list`, `log-week-bar`, `log-week-km-text`, `log-week-goal-text`.
- Planner: `planner-prev`, `planner-next`, `planner-month-label`, `planner-cal-labels`, `planner-grid`, `planner-week-suggestion`, `planner-next-week`, `overflow-current`, `overflow-next`.
- Race IQ: `race-predicted`, `race-basis`, `race-gap-badge`, `race-gap-bar`, `race-gap-desc`, `race-source-card`, `race-longao-list`.
- Coach: `coach-ai-badge`, `coach-context-box`, `coach-sugs`, `chat-msgs`, `chat-input`, `plan-collapsible-header`, `plan-collapsible-body`, `plan-km-goal`, `plan-km-suggestion`, `plan-week-target-label`, `plan-feeling`, `plan-notes`, `toggle-ref`.
- Planner params/preview: `modal-params`, `param-long`, `param-long-val`, `param-quality-row`, `param-intensity-row`, `param-priority-row`, `param-workrun-row`, `modal-preview`, `preview-subtitle`, `preview-list`, `preview-summary`, `preview-confirm-row`.
- Day drawer: `drawer-day`, `dd-date`, `dd-title`, `dd-badges`, `dd-steps`, `dd-steps-section`, `dd-notes`, `dd-notes-section`, `dd-complete-btn`, `dd-delete-btn`, `dd-delete-planned-btn`, `dd-view-mode`, `dd-edit-mode`, `dd-edit-type`, `dd-edit-dist`, `dd-edit-pace`, `dd-edit-notes`, `toggle-rebalance`.
- Auth/sync: `auth-card`, `auth-logged-out`, `auth-logged-in`, `auth-name`, `auth-email`, `auth-avatar`, `sync-indicator`, `sync-status-text`.
- Settings/config: `cfg-race-date`, `cfg-race-name`, `cfg-month-goal`, `cfg-week-goal`, `cfg-scale-start`, `cfg-name`, `cfg-weight`, `cfg-height`.
- Athlete profile: `cfg-ap-goal`, `cfg-ap-target-time`, `cfg-ap-strength-pref`, `cfg-ap-longrun-pref`, `cfg-ap-injuries`, `cfg-ap-notes`.
- Gemini settings: `gemini-badge`, `cfg-gemini-key`, `gemini-key-eye`, `gemini-key-status`.
- Strava settings/import: `strava-badge`, `cfg-strava-id`, `strava-status`, `strava-connect-row`, `strava-connect-btn`, `strava-connected-row`, `strava-last-sync`, `modal-strava`, `strava-import-subtitle`, `strava-import-btn`, `strava-activity-list`.

### IDs dinamicos criados por JavaScript

- `wi-${w.id}` para itens de treino no log.
- `sa-${a.id}` para atividades listadas no modal de importacao Strava.
- `coach-insights` criado em runtime por `renderCoachContext()` caso ainda nao exista.
- `typing-indicator` criado por `addTypingIndicator()` e removido por `removeTypingIndicator()`.
- `nav-${sec.replace('sec-', '')}` calculado por `goTo(sec)`.

## 4. Todas as chaves de localStorage

### Dados principais

- `pacemaker_v2`: chave legacy e fallback quando nao ha usuario autenticado.
- `pacemaker_${uid}`: chave principal com estado completo quando ha login Firebase. Contem `config`, `workouts`, `chatHistory`, `athleteProfile`, `user` e `stravaConfig` conforme estado local.

### Strava

- `pacemaker_strava`: tokens Strava quando nao ha usuario logado.
- `pacemaker_strava_${uid}`: tokens Strava escopados por usuario.
- `pacemaker_strava_cid`: Strava Client ID sem usuario.
- `pacemaker_strava_cid_${uid}`: Strava Client ID por usuario.
- `pacemaker_strava_secret`: Strava Client Secret sem usuario.
- `pacemaker_strava_secret_${uid}`: Strava Client Secret por usuario.

### Gemini

- `pacemaker_gemini_key`: Gemini API key local em texto claro no dispositivo.

### Limpeza/migracao

- `pacemaker_oai_key`: removida no boot por migracao v0.8.2.

Observacao: o service worker usa cache chamado `pacemaker-v2`, mas isso e Cache Storage, nao localStorage.

## 5. Dependencias externas

### Firebase

- CDN modular v10.12.0:
  - `https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js`
  - `https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js`
  - `https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js`
- Auth: Google via `GoogleAuthProvider`, `signInWithPopup`, `signOut`, `onAuthStateChanged`.
- Firestore: `getFirestore`, `doc`, `setDoc`, `getDoc`, `enableIndexedDbPersistence`.
- Projeto configurado: `pacemaker-85909`.
- Colecao/documento usado: `users/{state.user.uid}`.
- Payload cloud: `schemaVersion`, `updatedAt`, `config`, `workouts`, `athleteProfile`, `stravaConfig`, `geminiKeyEncrypted`.
- `chatHistory` nao e enviado ao Firestore pelo payload atual.

### Gemini

- Endpoint usado para teste e chat:
  - `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`
- API key persistida em `localStorage` como `pacemaker_gemini_key`.
- Quando logado, a key tambem vai para Firestore em `geminiKeyEncrypted`, ofuscada por XOR com UID e `btoa`; o proprio comentario informa que nao e criptografia forte.
- `sendToGemini()` envia `system_instruction`, historico recente, mensagem atual, `generationConfig` e `safetySettings` com `BLOCK_NONE`.
- Sem key ou offline, `sendCoach()` cai para `sendMock()`.

### Strava

- OAuth authorize:
  - `https://www.strava.com/oauth/authorize`
  - parametros: `client_id`, `response_type=code`, `redirect_uri`, `approval_prompt=auto`, `scope=activity:read_all`.
- Token exchange/refresh:
  - `https://www.strava.com/oauth/token`
  - usa `client_id`, `client_secret`, `code` ou `refresh_token`.
- Activities:
  - `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=60`
  - usa header `Authorization: Bearer ${token}`.
- Tokens e secret ficam em localStorage; metadados seguros (`clientId`, `connected`, `athlete`) entram em `state.stravaConfig` e sincronizam via Firestore.
- Importacao evita duplicatas por `stravaId`.

### PWA

- Head contem meta tags mobile/PWA e icones:
  - `theme-color=#0a0a0f`
  - `apple-mobile-web-app-capable=yes`
  - `apple-mobile-web-app-status-bar-style=black-translucent`
  - `apple-mobile-web-app-title=Pacemaker`
  - `icon-192.png` como favicon e apple touch icon.
- Manifest e criado em runtime por Blob, com `name`, `short_name`, `start_url`, `display=standalone`, cores e icones `icon-192.png`, `icon-512.png`.
- Service worker e criado em runtime por Blob e registrado via `navigator.serviceWorker.register(URL.createObjectURL(swBlob))`.
- Cache name: `pacemaker-v2`.
- O service worker intercepta `fetch` e tenta `fetch(e.request).catch(()=>caches.match(e.request))`, mas o codigo atual nao popula explicitamente o cache.

### ICS

- Sem biblioteca externa; geracao manual em `generateICS(workouts)`.
- Download por Blob `text/calendar;charset=utf-8`, `URL.createObjectURL`, elemento `<a download>` e clique programatico.
- Exportacoes atuais:
  - semana atual: `exportCurrentWeek()`
  - proxima semana: `exportNextWeekToCalendar()`
  - semana planejada generica: `exportWeekToCalendar()`
  - mes planejado: `exportMonthToCalendar()`
- Campos ICS: `BEGIN:VCALENDAR`, `VERSION:2.0`, `PRODID:-//Pacemaker//v0.8.2//EN`, `CALSCALE:GREGORIAN`, `METHOD:PUBLISH`, `X-WR-CALNAME`, `X-WR-CALDESC`, eventos `VEVENT` com `UID`, `DTSTAMP`, `DTSTART`, `DTEND`, `SUMMARY`, `DESCRIPTION`, `CATEGORIES`, `STATUS:TENTATIVE`.

## 6. Fluxos criticos

### Login Google

1. Usuario clica em `firebaseLogin()`.
2. A funcao valida `window._fbAuth` e `window._fbGoogleProvider`.
3. Chama `signInWithPopup` via metodo em `_fbAuth` se existir, senao importa dinamicamente Firebase Auth e chama `signInWithPopup(window._fbAuth, window._fbGoogleProvider)`.
4. `onAuthStateChanged(fbAuth, user => ...)` no script modular atualiza `state.user`.
5. `renderAuthCard()` muda UI logado/deslogado.
6. Quando logado, `renderAuthCard()` dispara `downloadFromCloud().then(() => checkMigration())`.
7. `renderSyncIndicator()` ajusta estado visual, considerando offline.

Ponto importante: o listener Firebase e declarado antes do script principal, mas so roda depois de mudancas de auth. Ele referencia `state`, que e declarado no script principal posterior; se o callback disparar cedo demais, existe risco temporal.

### Cloud Sync

1. `save()` foi sobrescrita no fim do script: primeiro grava `localStorage.setItem(getDbKey(), JSON.stringify(state))`.
2. Se `state.user` existe e `navigator.onLine`, chama `uploadToCloud()` em background.
3. `uploadToCloud()` escreve `users/{uid}` no Firestore com merge.
4. `downloadFromCloud()` le `users/{uid}`, mescla `config`, `workouts`, `athleteProfile`, `stravaConfig`, restaura Client ID Strava para localStorage e restaura Gemini key local se houver `geminiKeyEncrypted`.
5. Apos download, chama `save()` e rerenderiza Dashboard, Log e Planner.
6. `syncNow()` executa apenas upload manual.
7. Eventos `online`, `offline` e `visibilitychange` tambem disparam upload/download.
8. `checkMigration()` migra `pacemaker_v2` para `pacemaker_${uid}` quando aplicavel.

### Strava Sync

1. Usuario informa `cfg-strava-id` e chama `stravaConnect()`.
2. Client ID e salvo em `getStravaCidKey()`.
3. App redireciona para `https://www.strava.com/oauth/authorize` com `activity:read_all`.
4. No retorno, `handleStravaCallback()` le `code`, `scope` e `error` de `window.location.search`, limpa a URL com `history.replaceState` e busca Client ID/Secret no localStorage.
5. Se nao houver secret, pede via `prompt()` e salva em `getStravaSecKey()`.
6. `exchangeStravaCode()` chama `/oauth/token`, salva tokens em `getStravaKey()`, salva metadados seguros em `state.stravaConfig`, chama `save()`, atualiza badge e volta para settings.
7. `stravaSync()` chama `refreshStravaToken()`, busca atividades dos ultimos 60 dias, atualiza `lastSync`, renderiza modal de importacao e abre `modal-strava`.
8. `stravaImportSelected()` converte atividades selecionadas em workouts locais (`id='strava_'+a.id`, `stravaId`, `type`, `date`, `dist`, `pace`, `hr`, `duration`, `notes`), evita duplicatas e salva.

### Coach Gemini

1. `saveGeminiKey()` testa a key chamando Gemini com `ping`.
2. Se OK, salva `pacemaker_gemini_key`, atualiza badges e, se logado, faz upload para Firestore com key ofuscada.
3. `sendCoach()` adiciona mensagem do usuario em `state.chatHistory` e mostra typing indicator.
4. Se existe key e `navigator.onLine`, chama `sendToGemini(text)`.
5. `sendToGemini()` monta contexto por `buildSystemPrompt()` e `buildCoachContext()`, inclui historico recente e chama Gemini.
6. Resposta volta para `state.chatHistory`; em erro de quota/key/network ha mensagens especificas e fallback offline para erro de rede.
7. Sem key ou offline, `sendCoach()` chama `sendMock()`.
8. `renderCoachContext()` tambem gera mensagem inicial e insights locais quando o historico esta vazio.

### Planner

1. `renderPlanner()` desenha calendario mensal conforme `plannerOffset`, usando `isWorkDay()` e `getCalDayContent()`.
2. `renderPlannerSuggestion()` calcula semana atual, volume executado, plannedKm e aderencia.
3. `renderNextWeekCard()` mostra o plano da proxima semana se existir.
4. No Coach, `previewWeekPlan()` le `plan-km-goal`, `plan-feeling`, `plan-notes`, parametros avancados e contexto.
5. O plano e sempre gerado para a proxima semana (`planNextWeek = true`) com bounds segunda-domingo.
6. `generateWeekPlan()` monta treinos por dia considerando escala 2x2, fadiga/intensidade/prioridade e rotacao de musculacao.
7. `pendingPlan` recebe snapshot e `modal-preview` mostra resumo.
8. `confirmPlan()` remove treinos planejados da semana alvo, insere novos `planned:true`, salva, fecha modal e renderiza.
9. Existem fluxos auxiliares para plano conservador, limpar semana, limpar proxima semana, editar treino no drawer, completar planejado e rebalancear volume.

### Race IQ

1. `goTo('sec-race')` chama `renderRaceIQ()`.
2. A funcao filtra apenas longoes reais: `type==='long'`, `!planned`, `dist>0`, `pace` valido.
3. Calcula previsao usando ate 4 longoes recentes: pace medio * `1.055` * `42.195`.
4. Compara contra alvo interno `3h58` (`4*3600-120`).
5. Atualiza `race-predicted`, `race-gap-badge`, `race-gap-bar`, `race-gap-desc`, `race-basis`, `race-source-card` e lista `race-longao-list`.
6. Marca origem dos dados como Strava/manual quando `stravaId` existe.

## 7. Ordem de inicializacao da aplicacao

1. Browser carrega HTML, meta tags, icones e Google Fonts.
2. Script Firebase `type="module"` importa SDKs, inicializa app/auth/firestore, habilita IndexedDB persistence, expoe `window._fb*` e registra `onAuthStateChanged`.
3. CSS e HTML da UI sao carregados.
4. Script principal classico declara constantes, estado inicial e funcoes globais.
5. O script principal redefine `save()` no bloco Cloud Sync, preservando `_originalSave`, mas sem usa-lo.
6. Eventos globais sao registrados: `online`, `offline`, `visibilitychange`, touch swipe de workout, click global para overflow, modal overlay click, drawer click/swipe.
7. PWA manifest e criado por Blob e anexado ao `document.head`.
8. Service worker Blob e registrado se `navigator.serviceWorker` existir.
9. Init remove `pacemaker_oai_key`.
10. `load()` carrega estado de `pacemaker_${uid}` quando `state.user` ja existe, senao `pacemaker_v2`.
11. `handleStravaCallback()` e chamado se existir; quando termina, chama `renderDashboard()` e `updateStravaBadge()`.
12. Se nao houver handler, chama `renderDashboard()` diretamente.
13. O restante das telas e renderizado sob demanda por `goTo(sec)` ou por eventos de sync/login.

## 8. Pontos de acoplamento

- `index.html` concentra markup, estilo, estado, regra de negocio, integracoes externas e persistencia.
- HTML depende de funcoes globais por `onclick`, `oninput` e HTML montado por template strings.
- Renderizadores usam IDs fixos via `document.getElementById`; mudancas de markup quebram JS diretamente.
- `state` e objeto global mutavel compartilhado por Dashboard, Log, Planner, Coach, Race IQ, Strava e Cloud Sync.
- `save()` e sobrescrita depois da primeira definicao, alterando o contrato global de persistencia.
- Firebase modular expoe funcoes via `window._fb*` para o script classico.
- Cloud Sync depende de `state.user`, `localStorage`, Firestore, `navigator.onLine` e side effects de renderizacao.
- Strava mistura OAuth, prompt de secret, localStorage, estado sincronizado e UI no mesmo bloco.
- Gemini mistura configuracao de key, chamada externa, prompt de sistema, historico local e UI.
- Planner e Log compartilham o mesmo array `state.workouts` para itens reais, planejados, perdidos, restaurados e importados.
- Race IQ depende implicitamente da semantica de `state.workouts` (`planned`, `stravaId`, `type`, `pace`).
- PWA manifest e service worker sao gerados dinamicamente dentro do HTML, acoplando deploy offline ao app principal.
- IDs dinamicos (`wi-*`, `sa-*`) e handlers inline gerados via `innerHTML` acoplam dados, DOM e a API global.

## 9. Riscos para modularizacao

- Quebra de funcoes globais: extrair funcoes para modulos ES sem reexpor contrato global quebraria todos os `onclick` inline e templates dinamicos.
- Ordem de carregamento: Firebase module script referencia `state` no callback; modularizar pode alterar o timing e expor erros de `state` indefinido.
- Persistencia implicita: `save()` hoje significa localStorage + upload cloud assíncrono. Separar storage/cloud sem contrato claro pode causar perda de sync.
- Estado unico: `state.workouts` acumula varios tipos de entidade; separar Planner, Log, Strava e Race IQ exige normalizar flags (`planned`, `missed`, `adjusted_from`, `stravaId`, `origin_plan_date`).
- IDs como API: os IDs do DOM funcionam como contrato publico interno; renomear markup exige atualizar muitos pontos.
- HTML gerado por string: handlers e IDs dinamicos dentro de `innerHTML` dificultam trocar para componentes sem mapear eventos.
- Segredos locais: Strava Client Secret e Gemini API key estao no localStorage; modularizar sync/config sem cuidado pode vazar para cloud ou logs.
- Cloud merge: `downloadFromCloud()` mescla parcialmente alguns objetos e substitui arrays; mudancas de schema precisam de migracao explicita.
- Service worker Blob: mover PWA para arquivo real muda escopo, cache e lifecycle; pode coexistir com SW antigo se nao houver estrategia de versao.
- ICS manual: a geracao nao usa lib; alteracoes no modelo de workout podem quebrar exportacao silenciosamente.
- Planner sempre mira proxima semana no fluxo Coach; mudar UX de semana atual/proxima exige alinhar `previewWeekPlan()`, `renderNextWeekCard()` e exports.
- Race IQ usa alvo fixo `3h58` e formula propria; modularizar deve explicitar esses parametros para evitar divergencia entre Dashboard e Race IQ.
- Re-render side effects: varias funcoes salvam e renderizam multiplas telas; separar camadas sem orquestrador pode criar UI stale.
- Eventos globais: listeners de `document`, `window`, drawer e modal sao registrados no boot e assumem DOM presente.

## Resumo de contrato atual

O Pacemaker atual e uma PWA single-file com estado global mutavel, UI orientada por IDs, handlers inline globais, persistencia localStorage com sync Firestore opcional, integracoes diretas com Gemini e Strava no browser, e exportacao ICS manual. Para v0.8.5, a modularizacao mais segura precisa preservar primeiro estes contratos publicos internos: funcoes chamadas pelo HTML, IDs DOM, chaves de localStorage, formato de `state`, comportamento de `save()` e ordem de boot.
