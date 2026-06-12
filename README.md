## Pacemaker — Transformando dados de corrida em decisões inteligentes.

O Pacemaker é um aplicativo inovador de coaching de corrida impulsionado por Inteligência Artificial, projetado para personalizar seus treinos e guiá-lo rumo às suas metas. Com uma abordagem adaptativa e baseada em dados, o Pacemaker atua como seu parceiro de treino, oferecendo insights e planos que evoluem com você.

## Filosofia

O Pacemaker não foi criado para substituir o Strava.

O Strava registra atividades.

O Pacemaker interpreta essas atividades.

A missão do projeto é transformar:

Dados → Contexto → Decisão

permitindo que corredores amadores tenham acesso a um acompanhamento inteligente, contextual e adaptativo.

## Sobre o Projeto

Desenvolvido com o objetivo de democratizar o acesso a um coaching de alta qualidade, o Pacemaker integra tecnologias de ponta para oferecer uma experiência de usuário fluida e eficaz. A versão atual, v0.8.2, foca na sincronização de dados e no aprimoramento do contexto do coach, preparando o terreno para futuras expansões e uma experiência de usuário ainda mais rica.

Funcionalidades Atuais (v0.8.2)

A versão 0.8.2 do Pacemaker incorpora um conjunto robusto de funcionalidades, visando aprimorar a interação com o coach de IA e a persistência dos dados do usuário:

•
Login Google: Autenticação simplificada e segura através da sua conta Google.

•
Multi-device: Acesso contínuo e sincronizado aos seus dados e conversas em diferentes dispositivos.

•
Integração Strava: Conecte-se ao Strava para importar seus treinos e permitir que o Coach IA analise seu desempenho real.

•
Coach IA: Um treinador inteligente que programa seus treinos e oferece feedback personalizado.

•
Planner: Uma ferramenta visual para organizar e acompanhar seu calendário de treinos.

•
Race IQ: Análises e métricas para otimizar sua performance em corridas.

•
Firebase Sync: Sincronização de dados em tempo real e persistência offline através do Firebase Firestore.

•
Gemini Coach: Utilização da API Gemini para potencializar as capacidades de conversação e análise do Coach IA.

•
Cloud Sync da Gemini Key: Gerenciamento seguro e sincronizado da chave de API Gemini na nuvem.

•
Coach History Sync: Persistência e sincronização do histórico de conversas com o Coach IA, garantindo contexto contínuo.

•
Context Engine v1 (Em Andamento): Uma evolução crucial para o Coach IA, permitindo a análise de tendências de longo prazo para um planejamento mais inteligente:

•
Tendência de volume (8 semanas)

•
Tendência de pace

•
Tendência de aderência ao plano

•
Tendência de fadiga

•
Tendência de longão

•
Objetivo: O Coach IA passa a olhar a evolução do corredor, e não apenas o momento presente.

•
Weekly Reports (Em Andamento): Geração automática de relatórios semanais para fornecer um resumo claro do progresso, acertos, riscos e próximos passos.

Arquitetura de Alto Nível (v0.8.2)

O Pacemaker v0.8.2 é construído sobre uma base de tecnologias web modernas, com foco em simplicidade e desempenho para a experiência mobile:

•
Frontend: HTML, CSS (com variáveis e estilos inspirados em Tailwind CSS) e JavaScript Vanilla.

•
Backend/Dados: Firebase (Authentication para login, Firestore para banco de dados NoSQL em tempo real).

•
Inteligência Artificial: Integração com a API Gemini para o motor do Coach IA.

•
Estrutura: Atualmente, o projeto é mantido em um único arquivo HTML/JavaScript, o que facilita o desenvolvimento rápido, mas está planejado para modularização futura.

## Roadmap Oficial

O futuro do Pacemaker é ambicioso, com um plano claro para evoluir a plataforma e a experiência do usuário:

v0.8.2 — Context & Sync (Atual)

•
Remover OpenAI: ✅ Concluído

•
Gemini Key Cloud: ✅ Concluído

•
Coach History Sync: 🔄 Em Andamento

•
Conversa compartilhada PC ↔ celular

•
Persistência entre dispositivos

•
Contexto contínuo



•
Context Engine v1: 🔄 Em Andamento

•
Adicionar tendências (volume, pace, aderência, fadiga, longão)

•
Resultado: Coach deixa de olhar apenas "agora" e passa a olhar "evolução"



•
Weekly Reports: 🔄 Em Andamento

•
Gerar automaticamente: Resumo da semana, Acertos, Riscos, Próximos passos



v0.8.5 — React Foundation

Esta versão é um passo crucial de preparação para a migração para React, focando na modularização do código JavaScript Vanilla existente para reduzir riscos e facilitar a transição.

•
Objetivo: Preparar o terreno para a migração.

•
Fazer: Separar o HTML monolítico em módulos JavaScript Vanilla:

•
firebase.js

•
coach.js

•
planner.js

•
raceiq.js

•
storage.js

•
ui.js



•
Benefício: Reduz significativamente o risco da migração para React, isolando a lógica de negócio da interface do usuário.

v0.9.0 — Desktop Experience

Expansão da experiência do Pacemaker para desktops, com interfaces otimizadas para telas maiores.

•
Desktop Dashboard: Layout com Sidebar, Dashboard principal, Coach, Planner, Race IQ e Longão.

•
Desktop Coach: O Coach IA terá uma tela própria, apresentando-se como um painel com Histórico, Tendências, Alertas e Recomendações, em vez de um chat simples.

v0.9.5 — React Migration

A migração incremental para uma stack React moderna, garantindo estabilidade e escalabilidade.

•
Estratégia: Migração gradual, não reescrita completa, para evitar quebras no projeto.

•
Stack: Vite, React, React Router, Context API, Zustand (para gerenciamento de estado), Firebase, TypeScript e Tailwind CSS.

•
Ordem de Migração: Dashboard, Planner, Log, Race IQ, Coach.

v1.0 — Pacemaker Public Release

O lançamento público do Pacemaker, com um produto completo e utilizável por qualquer corredor.

•
Objetivo: Produto utilizável por qualquer corredor.

•
Funcionalidades Incluídas:

•
✅ Login Google

•
✅ Multi-device

•
✅ Strava

•
✅ Coach IA

•
✅ Planner

•
✅ Race IQ

•
✅ Weekly Reports

•
✅ Desktop Experience

•
✅ React (migração concluída)



v1.1 — Coach Evolution

Aprimoramento contínuo do Coach IA, com foco em inteligência e personalização avançadas.

•
Coach Memory: Além do histórico de chat, o coach terá uma "memória" estruturada sobre o usuário (ex: lesões, metas, preferências de treino).

•
Coach Socrático: O coach fará perguntas contextuais antes de responder, aprofundando a compreensão do estado do usuário (ex: "Você dormiu bem? Como foi a recuperação?").

•
Discordância Inteligente: O coach será capaz de discordar de solicitações irrealistas do usuário, fornecendo justificativas baseadas em dados e segurança.

v2.0 — O Sonho: Planejamento Automático e Ajuste Dinâmico

A visão de longo prazo para o Pacemaker, onde o coach se torna proativo e o plano de treino se adapta em tempo real.

•
Planejamento Automático: O coach apresentará o treino do dia sem a necessidade de perguntas, justificando-o com base em recuperação, fadiga e metas.

•
Ajuste Dinâmico: O plano de treino se recalculará automaticamente em resposta a eventos como treinos perdidos, noites mal dormidas ou recordes pessoais (RPs).

Changelog Resumido

•
v0.8.2 (Atual): Foco em Context & Sync. Implementação de Firebase Sync, Gemini Coach, Cloud Sync da Gemini Key, Coach History Sync. Início do desenvolvimento do Context Engine v1 e Weekly Reports. Remoção da dependência do OpenAI.

•
Versões Anteriores: Implementação inicial de Login Google, Multi-device, Integração Strava, Coach IA básico, Planner e Race IQ.

Contribuição

Atualmente, o projeto está em fase de desenvolvimento interno. Informações sobre como contribuir serão adicionadas em futuras versões.
]

