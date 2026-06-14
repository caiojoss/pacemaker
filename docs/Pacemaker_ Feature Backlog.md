# Pacemaker: Feature Backlog

Este documento detalha o backlog de funcionalidades do Pacemaker, classificando-as por prioridade (P0, P1, P2) e fornecendo informações essenciais para o planejamento e execução do desenvolvimento. A priorização reflete o roadmap atualizado e a visão de produto, focando em entregar valor ao usuário de forma incremental e estratégica.

## 1. Definição de Prioridades

*   **P0 (Prioridade Crítica):** Funcionalidades essenciais para a próxima versão, que entregam valor imediato e são cruciais para a experiência do usuário ou para a base tecnológica. Bloqueadores para o lançamento da versão.
*   **P1 (Prioridade Alta):** Funcionalidades importantes que agregam valor significativo, mas não são bloqueadores para a próxima versão. Podem ser incluídas se houver capacidade, ou movidas para versões subsequentes.
*   **P2 (Prioridade Média):** Funcionalidades desejáveis que melhoram a experiência ou abrem novas possibilidades, mas não são urgentes. Serão consideradas após a entrega das P0 e P1.

## 2. Backlog de Funcionalidades

| Funcionalidade | Prioridade | Valor para o Usuário | Complexidade Técnica | Dependências | Versão Recomendada |
| :------------- | :--------- | :------------------- | :------------------- | :----------- | :----------------- |
| **Desktop Experience** | P0 | Usabilidade superior em telas maiores, maior produtividade no planejamento e análise. | Média (CSS, JS DOM manipulation) | Nenhuma direta | v0.8.5 |
| **Coach Assisted Planning** | P0 | Reduz fricção no planejamento, transforma sugestões do Coach em ações concretas com 1 clique. | Média (JS DOM manipulation, integração com `generateWeekPlan`) | Coach IA, Planner | v0.8.5 |
| **Weekly Reports (Desktop)** | P0 | Visualização mais rica e detalhada dos relatórios semanais, tornando-os um elemento central do produto. | Baixa (CSS, JS DOM manipulation) | Context Engine v1 | v0.8.5 |
| **Coach Workspace** | P0 | Centraliza informações contextuais do atleta (histórico, tendências, alertas) junto ao chat, tornando o Coach mais poderoso. | Média (JS DOM manipulation, integração com `state`) | Context Engine v1, Coach IA | v0.8.5 |
| **Strava One Click Login** | P1 | Facilita o onboarding e a conexão com o Strava, reduzindo barreiras de entrada. | Média (Integração OAuth, Firebase Functions) | Firebase Auth, Strava API | v0.9.0 |
| **React Foundation** | P1 | Prepara a base para a migração para React, modularizando o código Vanilla JS e adotando TypeScript/Zustand. | Alta (Refatoração de código, reescrita de módulos) | Nenhuma direta | v0.9.0 |
| **Coach Memory** | P1 | Permite ao Coach lembrar de conversas anteriores e preferências do usuário ao longo do tempo, tornando a interação mais natural. | Alta (Persistência de contexto no Firebase, otimização de prompts) | Firebase Sync, Coach IA | v1.0 |
| **React Migration** | P0 | Reescrita gradual da UI em React, melhorando performance, manutenibilidade e escalabilidade. | Alta (Reescrita de componentes, integração com Zustand) | React Foundation | v0.9.5 |
| **Coach Socrático** | P2 | Coach faz perguntas para entender melhor o atleta, gerando insights mais profundos e personalizados. | Média (Lógica de IA, prompts avançados) | Coach IA | v1.1 |
| **Discordância Inteligente** | P1 | Coach justifica suas recomendações e permite ao usuário "discordar", gerando um diálogo mais rico e adaptativo. | Média (Lógica de IA, tratamento de intenções) | Coach IA | v1.0 |
| **Planejamento Automático** | P2 | Coach gera um plano completo com base nas metas do usuário, sem necessidade de input manual de KM. | Alta (Lógica de IA, integração com Planner) | Coach IA, Planner | v1.1 |
| **Ajuste Dinâmico (Pós-Treino)** | P1 | Coach ajusta o plano da semana com base no feedback de fadiga e RPE do treino recém-registrado. | Alta (Context Engine v1, lógica de IA, Planner) | Context Engine v1, Planner | v1.0 |
| **Integração com Google Calendar (Bidirecional)** | P1 | Sincronização automática de treinos planejados e executados com o Google Calendar. | Média (Google Calendar API, Firebase Functions) | Planner | v1.0 |
| **Notificações Push (Mobile)** | P1 | Lembretes de treino, alertas de risco, insights do Coach entregues proativamente. | Média (Firebase Cloud Messaging, Service Workers) | Mobile Experience | v1.0 |
| **Race IQ Avançado** | P1 | Análise mais profunda de performance em corridas, com gráficos de pace, zonas de FC, etc. | Média (Data Visualization, Context Engine v1) | Context Engine v1 | v1.0 |
| **Metas de Longo Prazo (v2.0)** | P2 | Definição e acompanhamento de metas de longo prazo (ex: maratona em X tempo), com planos de periodização. | Alta (Lógica de IA, Planner, Context Engine v1) | Coach IA, Planner | v2.0 |
| **Integração com Wearables (Direta)** | P2 | Conexão direta com Apple Watch, Garmin Connect, etc., para dados em tempo real. | Alta (APIs de fabricantes, Mobile Experience) | Mobile Experience | v2.0 |

## 3. Roadmap Atualizado

Com base na validação da v0.8.3 e na nova direção do produto, o roadmap é redefinido para focar na experiência desktop e na transição para React de forma estratégica.

*   **v0.8.5: Desktop Experience + Coach Assisted Planning**
    *   Transformar o Pacemaker em uma experiência desktop de primeira classe.
    *   Implementar Sidebar, layout responsivo, Coach Workspace.
    *   Integrar Coach Assisted Planning para planejamento sem fricção.
    *   Otimizar Weekly Reports e Dashboard para desktop.

*   **v0.9.0: React Foundation**
    *   Modularização do código Vanilla JS existente.
    *   Adoção de TypeScript e Zustand para gerenciamento de estado.
    *   Preparação do ambiente para a migração gradual para React.

*   **v0.9.5: React Migration**
    *   Reescrita gradual dos componentes da interface para React.
    *   Foco na migração das seções mais complexas e interativas.

*   **v1.0: Public Release**
    *   Lançamento oficial do Pacemaker com a nova arquitetura React.
    *   Inclusão de funcionalidades P1 como Coach Memory, Discordância Inteligente e Ajuste Dinâmico.
    *   Experiência completa e estável em desktop e mobile.

*   **v1.1: Otimização e Novas Integrações**
    *   Melhorias de performance e usabilidade pós-lançamento.
    *   Implementação de Coach Socrático e Planejamento Automático.
    *   Novas integrações (ex: Google Calendar bidirecional, Notificações Push).

*   **v2.0: O Treinador Proativo e Autônomo**
    *   Visão de longo prazo com IA preditiva, integração com wearables para dados holísticos.
    *   Gamificação inteligente e metas de longo prazo.
    *   Pacemaker como o parceiro definitivo na jornada do corredor.
