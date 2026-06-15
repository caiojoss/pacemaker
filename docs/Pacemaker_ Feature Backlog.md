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
| **Onboarding Experience** | P0 | Facilita a entrada de novos usuários, reduzindo a fricção e acelerando a configuração inicial. | Média (JS DOM manipulation, Firebase Auth) | Nenhuma direta | v0.9.0 |
| **Strava One Click Login** | P0 | Facilita o onboarding e a conexão com o Strava, reduzindo barreiras de entrada. | Média (Integração OAuth, Firebase Functions) | Firebase Auth, Strava API | v0.9.0 |
| **Google Login** | P0 | Autenticação simplificada e segura, parte do setup otimizado. | Baixa (Firebase Auth) | Nenhuma direta | v0.9.0 |
| **Setup Simplificado** | P0 | Guia o usuário na configuração inicial de forma rápida e intuitiva. | Média (JS DOM manipulation, Firebase) | Onboarding Experience | v0.9.0 |
| **React Foundation** | P0 | Prepara a base para a migração para React, modularizando o código Vanilla JS e adotando TypeScript/Zustand. | Alta (Refatoração de código, reescrita de módulos) | Nenhuma direta | v0.9.5 |
| **React Migration** | P0 | Reescrita gradual da UI em React, melhorando performance, manutenibilidade e escalabilidade. | Alta (Reescrita de componentes, integração com Zustand) | React Foundation | v0.9.5 |
| **Coach Memory** | P0 | Permite ao Coach lembrar de conversas anteriores e preferências do usuário ao longo do tempo, tornando a interação mais natural. | Alta (Persistência de contexto no Firebase, otimização de prompts) | Firebase Sync, Coach IA | v1.0 Beta |
| **Calendar Sync (Bidirecional)** | P0 | Sincronização automática de treinos planejados e executados com o Google Calendar. | Média (Google Calendar API, Firebase Functions) | Planner | v1.0 Beta |
| **Work-Life Engine** | P0 | Integra fatores da vida real (escalas, disponibilidade) no planejamento, tornando-o mais realista. | Alta (Lógica de IA, Planner, Firebase) | Coach IA, Planner | v1.1 |
| **Escalas de Trabalho** | P0 | Permite ao usuário definir seus horários de trabalho para o Coach considerar no planejamento. | Média (UI, Firebase) | Work-Life Engine | v1.1 |
| **Disponibilidade Personalizada** | P0 | Usuário define dias e horários preferenciais para treinar. | Média (UI, Firebase) | Work-Life Engine | v1.1 |
| **Objetivos Estruturados** | P0 | Permite ao usuário definir metas de forma mais estruturada para o Coach otimizar o plano. | Média (UI, Firebase, Coach IA) | Coach IA | v1.1 |
| **Health Hub** | P0 | Transforma o Pacemaker em um hub central de saúde e performance. | Alta (Integração APIs externas, Firebase) | Nenhuma direta | v2.0 |
| **Integração Garmin** | P0 | Conexão direta com Garmin Connect para dados de treino e saúde. | Alta (Garmin API, Firebase Functions) | Health Hub | v2.0 |
| **Integração Samsung Health** | P0 | Conexão direta com Samsung Health para dados de treino e saúde. | Alta (Samsung Health API, Firebase Functions) | Health Hub | v2.0 |
| **Integração Apple Health** | P0 | Conexão direta com Apple Health para dados de treino e saúde. | Alta (Apple Health API, Firebase Functions) | Health Hub | v2.0 |
| **Readiness Inteligente** | P0 | Sistema avançado de prontidão para o treino baseado em dados de sono, VFC, estresse. | Alta (Lógica de IA, Context Engine v1, Health Hub) | Health Hub, Context Engine v1 | v2.0 |
| **Discordância Inteligente** | P1 | Coach justifica suas recomendações e permite ao usuário "discordar", gerando um diálogo mais rico e adaptativo. | Média (Lógica de IA, tratamento de intenções) | Coach IA | v1.0 Beta |
| **Ajuste Dinâmico (Pós-Treino)** | P1 | Coach ajusta o plano da semana com base no feedback de fadiga e RPE do treino recém-registrado. | Alta (Context Engine v1, lógica de IA, Planner) | Context Engine v1, Planner | v1.0 Beta |
| **Notificações Push (Mobile)** | P1 | Lembretes de treino, alertas de risco, insights do Coach entregues proativamente. | Média (Firebase Cloud Messaging, Service Workers) | Mobile Experience | v1.0 Beta |
| **Race IQ Avançado** | P1 | Análise mais profunda de performance em corridas, com gráficos de pace, zonas de FC, etc. | Média (Data Visualization, Context Engine v1) | Context Engine v1 | v1.0 Beta |
| **Coach Socrático** | P2 | Coach faz perguntas para entender melhor o atleta, gerando insights mais profundos e personalizados. | Média (Lógica de IA, prompts avançados) | Coach IA | v1.1 |
| **Planejamento Automático** | P2 | Coach gera um plano completo com base nas metas do usuário, sem necessidade de input manual de KM. | Alta (Lógica de IA, integração com Planner) | Coach IA, Planner | v1.1 |
| **Metas de Longo Prazo (v2.0)** | P2 | Definição e acompanhamento de metas de longo prazo (ex: maratona em X tempo), com planos de periodização. | Alta (Lógica de IA, Planner, Context Engine v1) | Coach IA, Planner | v2.0 |

## 3. Roadmap Atualizado

Com base na validação da v0.8.3 e na nova direção do produto, o roadmap é redefinido para focar na experiência desktop e na transição para React de forma estratégica.

*   **v0.8.5: Desktop Experience + Coach Assisted Planning**
    *   **Objetivo:** Transformar o Pacemaker em uma experiência desktop de verdade, otimizando a interação para telas maiores e integrando o Coach diretamente no fluxo de planejamento.
    *   **Fazer:** Implementar Sidebar, layout responsivo, Coach Workspace (painel contextual), e Coach Assisted Planning (confirmação de plano com 1 clique).

*   **v0.9.0: Onboarding Experience**
    *   **Objetivo:** Simplificar e otimizar a entrada de novos usuários, reduzindo a fricção e acelerando a configuração inicial.
    *   **Fazer:** Implementar Strava One Click Login, Google Login, e um fluxo de setup inicial guiado e simplificado.

*   **v0.9.5: React Foundation + React Migration**
    *   **Objetivo:** Preparar a base técnica e iniciar a migração gradual para uma arquitetura React moderna, visando performance, manutenibilidade e escalabilidade.
    *   **Fazer:** Modularização do código Vanilla JS existente, adoção de TypeScript e Zustand, e reescrita incremental dos componentes da UI para React.

*   **v1.0 Beta: Public Release (5 Usuários Reais)**
    *   **Objetivo:** Lançamento beta do Pacemaker para um grupo seleto de 5 usuários reais, coletando feedback valioso para refinar o produto.
    *   **Fazer:** Implementar Coach Memory (memória de contexto de longo prazo para o Coach) e Calendar Sync (sincronização bidirecional com Google Calendar).

*   **v1.1: Work-Life Engine**
    *   **Objetivo:** Integrar o Pacemaker de forma mais profunda à vida do atleta, considerando fatores como trabalho, compromissos e disponibilidade.
    *   **Fazer:** Implementar escalas de trabalho, gerenciamento de disponibilidade, e definição de objetivos estruturados que o Coach possa usar para adaptar o plano.

*   **v2.0: Health Hub**
    *   **Objetivo:** Transformar o Pacemaker em um hub central de saúde e performance, integrando dados de diversas fontes para um coaching holístico.
    *   **Fazer:** Integração com Garmin, Samsung Health, Apple Health, e desenvolvimento de um sistema de Readiness inteligente (prontidão para o treino) baseado em múltiplos fatores de saúde.
