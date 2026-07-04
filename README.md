Pacemaker v1.0 — Documentação Oficial

O Pacemaker é uma plataforma completa de treinamento para corrida impulsionada por Inteligência Artificial. Projetado para transformar a maneira como corredores interagem com seus dados, o Pacemaker atua como um parceiro estratégico, oferecendo uma camada de inteligência que evolui junto com o atleta.

🏃‍♂️ Filosofia: Do Dado à Evolução

O Pacemaker não nasceu para ser um rastreador de atividades. O mercado já possui ferramentas excelentes para registro, como o Strava. O propósito do Pacemaker começa onde o registro termina.

Nossa filosofia fundamental evoluiu para refletir o ciclo completo de crescimento do atleta:


Dados → Contexto → Decisão → Evolução

Enquanto outras ferramentas focam no "o quê" (distância, tempo, pace), o Pacemaker foca no "porquê" e no "e agora?". Nós interpretamos o histórico e as tendências para ajudar o atleta a tomar decisões melhores hoje, garantindo uma evolução consistente e segura a longo prazo.




🚀 Funcionalidades Principais

O Pacemaker v1.0 oferece um ecossistema robusto para a gestão do treinamento:

Inteligência e Contexto

•
Coach IA: Um treinador inteligente disponível 24/7 para orientar seus treinos e tirar dúvidas.

•
Context Engine: O cérebro por trás do Coach, que analisa tendências de volume, fadiga e performance.

•
Athlete Memory: Uma base de conhecimento estruturada sobre você (detalhes abaixo).

•
Onboarding Inteligente: Processo de entrada que mapeia seu perfil, objetivos e restrições desde o primeiro dia.

Gestão e Planejamento

•
Planner: Calendário visual e intuitivo para organizar sua rotina de treinos.

•
Race IQ: Inteligência específica para preparação de provas, ajudando a definir ritmos e estratégias.

•
Dashboard: Visão consolidada do seu estado atual e progresso recente.

•
Weekly Reports: Relatórios semanais automáticos com resumos de acertos, riscos e próximos passos.

Infraestrutura e Experiência

•
Importação Strava: Sincronização direta para análise imediata das suas atividades reais.

•
Google Login & Multi-device: Autenticação segura e acesso sincronizado em qualquer dispositivo.

•
Firebase Sync & Firestore: Banco de dados em tempo real com Persistência Offline garantida.

•
Desktop Experience: Interface otimizada para telas grandes, focada em análise e planejamento profundo.

•
Coach History: Histórico completo de interações, mantendo a continuidade do diálogo em qualquer lugar.




🧠 Muito além de um Chat de IA

O Coach do Pacemaker não é um chatbot genérico. Ele é um Coach de Contexto. Diferente de IAs convencionais que respondem perguntas isoladas, o nosso Coach possui uma visão holística do atleta.

Ele não apenas "responde"; ele orienta com base em:

•
Histórico Completo: Ele sabe o que você correu nas últimas semanas.

•
Objetivos Reais: Ele entende para qual prova você está treinando.

•
Rotina e Preferências: Ele sabe seus dias de musculação e suas limitações de horário.

•
Evolução e Memória: Ele lembra de dores relatadas anteriormente ou de metas de volume superadas.




📁 Athlete Memory (Memória do Atleta)

A Athlete Memory é o coração da personalização no Pacemaker. É uma estrutura de dados permanente que serve como a "fonte única de verdade" para a IA.

Nesta seção, o Pacemaker armazena e utiliza informações como:

•
Objetivo Principal e Tempo Alvo: Ex: "Maratona de Porto Alegre em 3h30".

•
Rotina de Vida: Horários de trabalho e disponibilidade para treinar.

•
Histórico de Saúde: Lesões prévias e observações físicas.

•
Metas de Volume: O quanto você pretende rodar por semana/mês.

•
Dados Físicos: Peso, idade e métricas de performance.

Isso garante que o atleta nunca precise se explicar duas vezes. O Coach já sabe quem você é.




⚙️ Arquitetura e Configuração

O Pacemaker foi construído para ser ágil, resiliente e escalável.

Remote AI Configuration

Implementamos uma arquitetura de Remote Config via Firestore. Isso permite que a inteligência do sistema seja ajustada em tempo real sem a necessidade de novos deploys. Administradores podem alterar:

•
Modelo do Gemini (ex: Flash vs Pro).

•
Parâmetros de Temperatura e Criatividade.

•
Chaves de API e estados do serviço.

•
Habilitação/Desabilitação modular do Coach.

Esta estrutura prepara o terreno para a futura migração completa para Cloud Functions, isolando a lógica de negócio pesada do cliente.

Stack Tecnológica

•
Frontend: Single Page Application (SPA) em HTML5, CSS3 e JavaScript Moderno.

•
Auth: Firebase Authentication.

•
Database: Cloud Firestore com sincronização em tempo real.

•
Offline: Persistência de dados local para uso sem conectividade.

•
AI Engine: Google Gemini API com Context Engine proprietário.




💎 Princípios de Produto

Nossas decisões de desenvolvimento são guiadas por seis pilares fundamentais:

1.
Fonte Única de Verdade: Uma informação deve possuir apenas um local de edição.

2.
Contexto Total: O Coach sempre deve conhecer o contexto completo antes de opinar.

3.
Zero Repetição: O atleta nunca deve precisar explicar duas vezes quem ele é ou quais são seus problemas.

4.
Decisões Baseadas em Dados: Toda orientação deve ter fundamento no histórico e nas métricas coletadas.

5.
Orientação > Resposta: O objetivo da IA não é apenas responder perguntas, mas guiar o atleta ativamente.

6.
Simplicidade Poderosa: O app deve ser simples para quem está começando, mas oferecer profundidade para atletas avançados.




🗺️ Roadmap de Evolução

v0.9.x — Launch Polish

•
Refinamento Visual: Padronização de layout e revisão de UX.

•
Desktop Polish: Ajustes finais na experiência de tela larga.

•
Athlete Memory Integration: Coach plenamente consciente de toda a memória estruturada.

•
Empty States & Onboarding: Melhoria na usabilidade para novos usuários.

v1.0 — Public Release (Atual)

•
Lançamento oficial da plataforma completa para corredores.

v1.1 — Coach Evolution

•
Coach Socrático: A IA passará a fazer perguntas investigativas antes de sugerir mudanças.

•
Discordância Inteligente: Capacidade de negar treinos prejudiciais ou metas irrealistas com base em dados.

•
Coach Memory: Expansão da capacidade de aprendizado contínuo do treinador.

v2.0 — Automatic Planning

•
Plano Adaptativo: Replanejamento automático em caso de treinos perdidos ou fadiga excessiva.

•
Treino Automático: Sugestões proativas diárias sem necessidade de interação prévia.




© 2026 Pacemaker. Transformando dados de corrida em decisões inteligentes.

