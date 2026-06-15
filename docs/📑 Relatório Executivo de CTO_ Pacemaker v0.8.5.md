# 📑 Relatório Executivo de CTO: Pacemaker v0.8.5
**De:** CTO (Agente AI)  
**Para:** Fundador/CEO  
**Data:** 15 de Junho de 2026  
**Assunto:** Diagnóstico Técnico, Riscos e Estratégia de Escalabilidade

---

## 1. Diagnóstico do Produto Hoje
O Pacemaker v0.8.5 é um **monolítico de alta performance em arquivo único**. Embora tecnicamente "arcaico" por não usar frameworks modernos, ele atingiu um nível de funcionalidade impressionante para um protótipo Vanilla JS. 

*   **Estado:** Protótipo funcional avançado (Alpha).
*   **Funcionalidades:** O fluxo "Coach -> Planejamento -> Calendário" está sólido. O *Context Engine v1* e os *Weekly Reports* dão ao produto uma alma de "SaaS Profissional".
*   **Arquitetura:** Baseada em um único arquivo HTML/JS de ~5.000 linhas. Gerenciamento de estado global manual e persistência híbrida (LocalStorage + Firestore).
*   **Desktop:** A v0.8.5 resolveu a barreira visual, mas a lógica de "view" ainda é baseada em `display: none/block`, o que sobrecarrega o DOM.

---

## 2. Principais Riscos Técnicos ☢️
1.  **Dívida Técnica Explosiva:** O arquivo `index.html` está no limite da manutenibilidade. Qualquer alteração na lógica do Coach pode quebrar a renderização do Dashboard sem aviso prévio (falta de testes automatizados).
2.  **Segurança e Regras de Negócio:** Atualmente, a lógica de "quem pode ler o quê" no Firebase parece permissiva ou inexistente. As chaves de API estão expostas no front-end (esperado para o estágio atual, mas crítico para a v1.0).
3.  **Race Conditions no Sync:** O sistema de sincronização `uploadToCloud` e `downloadFromCloud` é ingênuo. Se o usuário abrir o app no PC e Celular simultaneamente, o último `save()` ganha, e dados de treino podem ser sobrescritos.
4.  **Dependência de CDN:** O app depende 100% de CDNs externas (Firebase, Google Fonts, Lucide). Sem internet, o app não inicializa, apesar do Service Worker básico.

---

## 3. Principais Riscos de Produto 🎯
1.  **Acurácia do Coach IA:** O Coach "alucina" em cálculos matemáticos de volume (como vimos no bug dos 50km vs 53km). Se o Coach der uma recomendação de volume que cause lesão ao atleta, o risco jurídico e de marca é alto.
2.  **Fricção no Onboarding:** O setup atual exige chaves de API e configurações manuais. Isso mata a conversão de usuários não-técnicos.
3.  **Retenção vs. Notificação:** O app é passivo. Se o usuário não abrir o app, o "Coach" não existe. Falta um sistema de push/email para manter o engajamento.

---

## 4. Gargalos de Escalabilidade 🚀
*   **Processamento no Cliente:** Todo o cálculo do *Context Engine* e *Weekly Reports* é feito no navegador do usuário toda vez que o app abre. Com 8 semanas de dados, é rápido. Com 2 anos de histórico, o app vai travar no carregamento.
*   **Firestore Reads/Writes:** O modelo atual de salvar o "estado inteiro" em um único documento Firestore vai estourar o limite de 1MB por documento e gerar custos desnecessários conforme o histórico de chat cresce.

---

## 5. Decisões Críticas antes da v1.0
1.  **Mudar para Arquitetura de Micro-documentos:** Separar `perfil`, `treinos` e `chatHistory` em coleções diferentes no Firebase.
2.  **Cálculo de IA no Server-side:** Mover a lógica sensível de planejamento para uma Cloud Function para garantir que o cálculo de KM seja exato e auditável.
3.  **Sistema de Login:** Decidir se o Strava será o login principal ou apenas uma fonte de dados. Recomendo Strava como login para reduzir fricção.

---

## 6. Oportunidades Não Exploradas
*   **Monetização via "Premium Coach":** O Context Engine v1 já permite criar um tier pago onde a IA é muito mais analítica.
*   **Gamificação de Aderência:** O dado de % de aderência é ouro. Poderíamos ter "Streaks" de consistência.
*   **IA Socrática:** Em vez de dar o plano, o Coach perguntar: "Como você se sente para 20km hoje?".

---

## 7. O que você provavelmente está ignorando
**O "Cemitério de Dados":** Você está focando muito no Coach responder bem hoje, mas está ignorando como os dados de 6 meses atrás serão usados. Se não estruturarmos o banco de dados agora, a "Memória do Coach" (v1.0) será impossível de implementar de forma eficiente.

---

## 8. Prioridades para os Próximos 90 Dias
1.  **Mês 1 (Estabilização):** Refatorar o `sync` para evitar perda de dados e implementar regras de segurança no Firebase.
2.  **Mês 2 (Onboarding):** Implementar Strava One-Click Login e Setup simplificado (v0.9.0).
3.  **Mês 3 (Migração):** Iniciar a **React Foundation (v0.9.5)**. Não é apenas "moda", é necessário para gerenciar a complexidade da UI Desktop.

---

## 💡 Se eu fosse o CTO, eu faria isso na próxima semana:
1.  **Isolar o Chat:** Mover o `chatHistory` para uma sub-coleção no Firestore imediatamente para evitar que o documento do usuário fique pesado demais.
2.  **Validação de KM via Código, não IA:** Criar uma função de validação que "trava" a resposta da IA se o KM planejado divergir mais de 1% da meta do usuário.
3.  **Implementar Sentry ou Log de Erros:** Adicionar um rastreador de erros básico. Hoje, se o app quebra no celular do usuário, você nunca saberá o porquê.
4.  **Refatorar o `buildCoachContext`:** Otimizar essa função para ser um módulo puro, preparando o terreno para a modularização da v0.9.5.

---
*Relatório gerado automaticamente pela IA CTO do Pacemaker.*
