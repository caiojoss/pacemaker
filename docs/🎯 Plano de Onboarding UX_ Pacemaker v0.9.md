# 🎯 Plano de Onboarding UX: Pacemaker v0.9

**De:** Especialista em UX e Product Design (Agente AI)  
**Para:** Fundador/CEO  
**Data:** 15 de Junho de 2026  
**Assunto:** Estratégia de Primeiro Acesso para Engajamento e Retenção

---

## Introdução
O onboarding é a primeira impressão e a fundação do relacionamento do usuário com o Pacemaker. Para a v0.9, o objetivo é transformar a coleta de dados em uma experiência de valor imediato, onde o usuário percebe que o Coach IA está ativamente construindo um plano personalizado para ele desde o primeiro clique. Reduzir a fricção e gerar um "Aha! Moment" rápido são cruciais para a retenção.

---

## 1. Jornada Completa do Primeiro Acesso

A jornada do usuário será guiada e focada em construir um perfil de atleta robusto para o Coach IA, culminando na apresentação do primeiro plano personalizado.

1.  **Instalação/Primeiro Acesso:** Usuário baixa o app (PWA ou loja) e o abre pela primeira vez.
2.  **Boas-Vindas & Proposta de Valor:** Tela inicial que rapidamente comunica o que o Pacemaker faz e por que é diferente.
3.  **Login/Cadastro Simplificado:** Opções de login rápido (Google, Strava) para reduzir a barreira inicial.
4.  **Coleta de Dados Essenciais (Progressiva):** Uma série de telas curtas e focadas para coletar informações cruciais para a personalização do Coach.
5.  **"Aha! Moment" - Primeiro Plano:** O Coach IA apresenta um plano de treino inicial baseado nos dados fornecidos, mostrando o valor da personalização.
6.  **Tour Rápido / Navegação:** Guia o usuário para as principais seções do app (Dashboard, Planner, Coach).
7.  **Dashboard Personalizado:** Usuário é levado ao Dashboard, que já reflete seu perfil e plano.

---

## 2. Fluxo de Telas & Wireframes Textuais

### Tela 1: Welcome & Value Proposition
*   **Objetivo:** Capturar a atenção, comunicar o valor principal do Pacemaker e incentivar o login.
*   **Dados Coletados:** Nenhum (apenas interação).
*   **Wireframe Textual:**
    ```
    [Logo Pacemaker]

    **Seu Coach de Corrida com IA. Personalizado. Adaptativo. Inteligente.**

    Cansado de planos genéricos? O Pacemaker cria treinos que se adaptam à sua vida, objetivos e evolução.

    [Botão: Começar Minha Jornada]
    [Link: Já tenho uma conta]
    ```

### Tela 2: Login / Cadastro
*   **Objetivo:** Oferecer opções de login/cadastro de baixa fricção.
*   **Dados Coletados:** Credenciais de autenticação.
*   **Wireframe Textual:**
    ```
    [Logo Pacemaker]

    **Entre ou Crie Sua Conta**

    [Botão: Continuar com Google] (Ícone Google)
    [Botão: Continuar com Strava] (Ícone Strava)

    [Linha divisória: ou]

    [Input: Email]
    [Input: Senha]
    [Botão: Entrar]
    [Link: Esqueceu a senha?]
    ```

### Tela 3: Dados Pessoais (Passo 1/X)
*   **Objetivo:** Coletar informações básicas para o perfil do atleta.
*   **Dados Coletados:** `Nome`, `Peso`, `Altura`.
*   **Ordem da Pergunta:** Iniciar com dados menos sensíveis e fáceis de preencher.
*   **Wireframe Textual:**
    ```
    [Barra de Progresso: ● ○ ○ ○ ○]

    **Olá! Para o Coach te conhecer melhor...**

    [Input: Qual o seu nome?]
    [Input: Qual o seu peso atual? (kg)]
    [Input: Qual a sua altura? (cm)]

    [Botão: Continuar]
    ```

### Tela 4: Experiência em Corrida (Passo 2/X)
*   **Objetivo:** Entender o nível de experiência do corredor para calibrar a intensidade do Coach.
*   **Dados Coletados:** `Experiência em corrida`.
*   **Ordem da Pergunta:** Após dados pessoais, focar na experiência esportiva.
*   **Wireframe Textual:**
    ```
    [Barra de Progresso: ○ ● ○ ○ ○]

    **Conte-nos sobre sua jornada na corrida:**

    [Opções de Seleção (Radio Buttons/Cards):]
    *   [ ] Iniciante (Começando agora)
    *   [ ] Intermediário (Corro há um tempo, busco melhorar)
    *   [ ] Avançado (Experiente, busco alta performance)

    [Botão: Continuar]
    ```

### Tela 5: Objetivo Principal (Passo 3/X)
*   **Objetivo:** Definir a meta primária do usuário para alinhar o Coach.
*   **Dados Coletados:** `Objetivo principal`.
*   **Ordem da Pergunta:** Entender o "porquê" antes do "o quê" (prova).
*   **Wireframe Textual:**
    ```
    [Barra de Progresso: ○ ○ ● ○ ○]

    **Qual seu principal objetivo com o Pacemaker?**

    [Opções de Seleção (Radio Buttons/Cards):]
    *   [ ] Correr minha primeira prova
    *   [ ] Melhorar meu tempo em uma distância específica
    *   [ ] Manter a forma física / Saúde
    *   [ ] Prevenir lesões
    *   [ ] Outro (Campo de texto opcional)

    [Botão: Continuar]
    ```

### Tela 6: Prova Alvo & Meta (Passo 4/X)
*   **Objetivo:** Coletar detalhes da prova para o planejamento específico.
*   **Dados Coletados:** `Prova alvo`, `Meta de tempo`.
*   **Ordem da Pergunta:** Se o objetivo for uma prova, coletar os detalhes dela.
*   **Wireframe Textual:**
    ```
    [Barra de Progresso: ○ ○ ○ ● ○]

    **Você tem uma prova alvo em mente?**

    [Input: Nome da Prova (ex: Maratona de São Paulo)]
    [Input: Data da Prova (Seletor de Data)]
    [Input: Meta de Tempo (ex: 03h 45min)]

    [Checkbox: Não tenho prova alvo no momento]

    [Botão: Continuar]
    ```

### Tela 7: Disponibilidade Semanal (Passo 5/X)
*   **Objetivo:** Entender a rotina do usuário para criar um plano realista.
*   **Dados Coletados:** `Escala de trabalho`, `Disponibilidade semanal`.
*   **Ordem da Pergunta:** Dados mais pessoais sobre rotina no final, após o usuário já ter investido tempo.
*   **Wireframe Textual:**
    ```
    [Barra de Progresso: ○ ○ ○ ○ ●]

    **Para o Coach montar seu plano ideal, precisamos saber:**

    [Dropdown: Qual sua escala de trabalho?]
    *   [ ] 5x2 (Seg-Sex)
    *   [ ] 6x1 (Folga rotativa)
    *   [ ] Outra (Campo de texto opcional)

    [Seleção de Dias/Horários (Matriz ou Checkboxes):]
    *   Seg: [ ] Manhã [ ] Tarde [ ] Noite
    *   Ter: [ ] Manhã [ ] Tarde [ ] Noite
    *   ...
    *   Dom: [ ] Manhã [ ] Tarde [ ] Noite

    [Botão: Finalizar e Gerar Meu Plano]
    ```

### Tela 8: Seu Primeiro Plano (Aha! Moment)
*   **Objetivo:** Entregar valor imediato, mostrando o poder da personalização do Coach IA.
*   **Dados Coletados:** Nenhum (apresentação).
*   **Wireframe Textual:**
    ```
    [Ícone: Troféu / Corrida]

    **Parabéns, [Nome do Usuário]! Seu Coach está pronto!**

    Baseado no seu perfil, o Coach IA gerou seu primeiro plano semanal:

    [Card: Resumo do Plano Semanal]
    *   Volume Total: [X] km
    *   Longão: [Y] km
    *   Treinos: [Z] dias

    [Botão: Ver Meu Plano Completo no Calendário]
    [Botão: Conversar com o Coach sobre este plano]
    ```

---

## 3. Estratégias de UX

### Estratégia para Reduzir Abandono
*   **Progressão Clara:** Barra de progresso visual em cada etapa para mostrar ao usuário onde ele está e quanto falta.
*   **Valor em Cada Passo:** Explicar brevemente por que cada informação é importante para o Coach (ex: "Seu peso ajuda o Coach a calcular a intensidade ideal").
*   **Minimalismo:** Telas limpas, com foco em uma única pergunta ou tipo de dado por vez.
*   **Feedback Positivo:** Mensagens de encorajamento após cada etapa (ex: "Ótimo! Mais um passo para seu plano perfeito!").
*   **Opção de Pular (com ressalvas):** Para campos não críticos, oferecer a opção de pular, mas explicar que o plano será menos preciso.

### Estratégia para Gerar Engajamento Imediato
*   **Personalização Imediata:** Usar o nome do usuário desde a primeira tela de dados. O Coach se refere ao usuário pelo nome.
*   **Visualização do Resultado:** A Tela 8 ("Seu Primeiro Plano") é o ponto alto, onde o usuário vê o resultado tangível da sua interação.
*   **Linguagem do Coach:** Manter a voz e o tom do Coach IA em todas as interações, reforçando a ideia de um parceiro de treino.
*   **Conexão Strava/Google:** Oferecer a conexão com Strava logo no início para importar dados existentes e acelerar a personalização.

### Como Apresentar Valor Rapidamente
*   **"Aha! Moment" na Tela 8:** A apresentação do primeiro plano de treino **personalizado** é o ponto chave. O usuário entende que não é um app genérico.
*   **Benefício, não Feature:** Em vez de dizer "Coletamos seu peso", dizer "Seu peso ajuda o Coach a otimizar a carga de treino e prevenir lesões".
*   **Visualização de Dados:** Usar gráficos simples ou badges para mostrar como os dados coletados impactam o plano (ex: "Com sua experiência intermediária, seu Coach sugere um volume inicial de X km").

---

## Fluxo Final Recomendado para v0.9

1.  **Welcome Screen:** `[Logo] + Proposta de Valor + [Botão: Começar]`
2.  **Login/Signup Screen:** `[Opções: Google, Strava, Email/Senha]`
3.  **Personal Data Screen:** `[Nome, Peso, Altura] + [Botão: Continuar]`
4.  **Running Experience Screen:** `[Nível de Experiência] + [Botão: Continuar]`
5.  **Main Goal Screen:** `[Objetivo Principal] + [Botão: Continuar]`
6.  **Race Target Screen:** `[Nome da Prova, Data, Meta de Tempo] + [Botão: Continuar]`
7.  **Availability Screen:** `[Escala de Trabalho, Disponibilidade Semanal] + [Botão: Finalizar e Gerar Meu Plano]`
8.  **First Plan Screen:** `[Resumo do Plano Gerado pelo Coach] + [Botões: Ver no Calendário, Conversar com o Coach]`
9.  **Dashboard:** `[Visualização do Dashboard já com dados do usuário e plano]`

---
*Plano de Onboarding gerado automaticamente pela IA Especialista em UX e Product Design do Pacemaker.*
