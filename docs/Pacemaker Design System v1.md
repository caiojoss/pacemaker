# Pacemaker Design System v1

## 1. Filosofia Visual

O Pacemaker adota uma filosofia visual que combina **funcionalidade, clareza e inspiração**. Nosso design é **minimalista, moderno e focado no atleta**, eliminando distrações para que o usuário possa se concentrar em seus treinos e metas. A estética é **limpa, com toques de energia e dinamismo**, refletindo a jornada de superação no esporte. Priorizamos a **legibilidade, a acessibilidade e a consistência** em todas as plataformas, garantindo uma experiência intuitiva e motivadora.

## 2. Paleta de Cores

Nossa paleta de cores é cuidadosamente selecionada para evocar energia, foco e calma. O contraste é otimizado para ambientes de alta e baixa luminosidade.

| Nome da Cor | Código HEX | Uso Principal |
| :---------- | :--------- | :------------ |
| **Fundo Principal** | `#0a0a0f` | Fundo de tela, elementos de base |
| **Superfície 1** | `#111118` | Cards, painéis, elementos de conteúdo |
| **Superfície 2** | `#18181f` | Elementos interativos, estados de hover |
| **Superfície 3** | `#1e1e28` | Fundo de modais, drawers |
| **Borda** | `rgba(255,255,255,0.07)` | Linhas divisórias, bordas de elementos |
| **Borda 2** | `rgba(255,255,255,0.13)` | Bordas de elementos interativos, foco |
| **Borda 3** | `rgba(255,255,255,0.2)` | Bordas de elementos em destaque |
| **Texto Principal** | `#f0eff8` | Títulos, textos de conteúdo |
| **Texto Secundário** | `rgba(240,239,248,0.55)` | Subtítulos, descrições, texto de apoio |
| **Texto Terciário** | `rgba(240,239,248,0.3)` | Labels, texto de rodapé, desabilitado |
| **Destaque (Accent)** | `#e8f55a` | Botões primários, ícones ativos, indicadores de sucesso |
| **Destaque Dim (Accent-Dim)** | `rgba(232,245,90,0.12)` | Fundo de elementos em destaque, estados de seleção |
| **Azul (Blue)** | `#4d9fff` | Indicadores de progresso, links, treinos de Z2 |
| **Azul Dim (Blue-Dim)** | `rgba(77,159,255,0.12)` | Fundo de elementos azuis |
| **Verde Água (Teal)** | `#2ee8c4` | Indicadores de sucesso, ícones de conclusão |
| **Verde Água Dim (Teal-Dim)** | `rgba(46,232,196,0.1)` | Fundo de elementos verde água |
| **Laranja (Orange)** | `#ff8c42` | Alertas, avisos, treinos de Tempo Run |
| **Laranja Dim (Orange-Dim)** | `rgba(255,140,66,0.1)` | Fundo de elementos laranja |
| **Vermelho (Red)** | `#ff5c5c` | Erros, ações destrutivas, treinos Intervalados |
| **Vermelho Dim (Red-Dim)** | `rgba(255,92,92,0.1)` | Fundo de elementos vermelhos |
| **Roxo (Purple)** | `#9b7eff` | Treinos de Longão, elementos de força |
| **Roxo Dim (Purple-Dim)** | `rgba(155,126,255,0.1)` | Fundo de elementos roxos |
| **Verde (Green)** | `#5dd68c` | Mensagens de sucesso, confirmações |
| **Verde Dim (Green-Dim)** | `rgba(93,214,140,0.1)` | Fundo de elementos verdes |

## 3. Tipografia

Utilizamos uma combinação de fontes para garantir legibilidade e personalidade.

*   **Fonte de Display/Títulos:** `Syne` (Sans-serif) - Usada para títulos, cabeçalhos e elementos de destaque. Transmite modernidade e impacto.
*   **Fonte Monospace/Dados:** `DM Mono` (Monospace) - Usada para dados numéricos, métricas, logs e informações técnicas. Garante alinhamento e clareza para números.

**Escala de Fontes (Exemplos):**

*   `--big-num`: 48px (para métricas principais)
*   `--med-num`: 24px (para subtotais)
*   `--small-num`: 16px (para detalhes)
*   `--label`: 9px (uppercase, letter-spacing para labels)
*   `--body`: 13px-15px (para texto de conteúdo)

## 4. Espaçamentos

Adotamos um sistema de espaçamento baseado em múltiplos de 4px para garantir consistência e harmonia visual.

| Variável CSS | Valor | Uso |
| :----------- | :---- | :-- |
| `--r` | `14px` | Border-radius padrão para cards e elementos maiores |
| `--r-sm` | `8px` | Border-radius para botões, inputs, elementos menores |
| `--r-lg` | `18px` | Border-radius para modais, drawers |
| `gap` | `4px`, `8px`, `10px`, `12px`, `16px`, `20px`, `24px` | Espaçamento entre elementos, padding interno |

## 5. Componentes Essenciais

### 5.1. Cards

*   **Estrutura:** `background: var(--surface); border: 0.5px solid var(--border); border-radius: var(--r); padding: 16px;`
*   **Variações:** `card-accent`, `card-blue`, `card-teal` (com `background` e `border-color` correspondentes às cores `dim`).
*   **Uso:** Agrupar informações relacionadas, exibir métricas, listas de itens.

### 5.2. Botões

*   **Estrutura Base:** `display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 18px; border-radius: var(--r-sm); font-family: var(--display); font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.15s; border: none;`
*   **`btn-primary`:** `background: var(--accent); color: #0a0a0f;` (Ação principal)
*   **`btn-ghost`:** `background: transparent; color: var(--text2); border: 0.5px solid var(--border2);` (Ações secundárias)
*   **`btn-danger`:** `background: var(--red-dim); color: var(--red); border: 0.5px solid rgba(255,92,92,0.3);` (Ações destrutivas)
*   **`btn.sel`:** `background: var(--accent-dim); color: var(--accent); border-color: rgba(232,245,90,0.4);` (Estado selecionado)

### 5.3. Inputs & Formulários

*   **Estrutura:** `width: 100%; background: var(--surface2); border: 0.5px solid var(--border2); border-radius: var(--r-sm); color: var(--text); font-family: var(--mono); font-size: 13px; padding: 10px 12px; outline: none; transition: border-color 0.15s;`
*   **Foco:** `border-color: rgba(232,245,90,0.4);`
*   **Labels:** `font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3);`

### 5.4. Modais & Drawers

*   **Overlay:** `position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 200;`
*   **Modal:** `background: var(--surface); border-radius: var(--r); border: 0.5px solid var(--border2); padding: 20px; max-width: 400px; margin: auto;`
*   **Drawer:** `background: var(--surface); border-radius: var(--r-lg) var(--r-lg) 0 0; border-top: 0.5px solid var(--border2); padding: 20px 16px; width: 100%; max-height: 85vh;`

## 6. Layouts Específicos

### 6.1. Dashboard

*   **Mobile:** Layout de coluna única, cards empilhados, navegação inferior.
*   **Desktop:** Utiliza o espaço horizontal. Cards podem ser organizados em grades de 2 ou 3 colunas. Informações mais densas e gráficos maiores são possíveis.

### 6.2. Desktop (Geral)

*   **Layout Principal:** `display: flex; flex-direction: row;` com `Sidebar` à esquerda e `main-content` à direita.
*   **`main-content`:** `flex: 1; max-width: 900px; margin: 0 auto;` (para manter o conteúdo centralizado e legível, mesmo em telas muito largas).
*   **Navegação:** `Sidebar` substitui a `bottom-nav` em telas maiores.

### 6.3. Mobile (Geral)

*   **Layout Principal:** `display: flex; flex-direction: column;` com `max-width: 480px; margin: 0 auto;` para simular a experiência de um smartphone.
*   **Navegação:** `bottom-nav` para acesso rápido às seções principais.

### 6.4. Sidebar (Desktop)

*   **Estrutura:** `width: 240px; background: var(--surface); border-right: 0.5px solid var(--border); flex-direction: column; padding: 24px 16px;`
*   **Elementos:** Logo, botões de navegação (`sidebar-btn`) com ícones e texto, estado ativo (`sidebar-btn.active`).

### 6.5. Coach Panel (Desktop)

*   Em desktop, o Coach não será apenas um chat, mas um painel contextualizado. Pode ocupar uma seção da `main-content` ou ser um `drawer` lateral em telas muito grandes.
*   **Elementos:** Histórico de conversas, contexto atual do atleta (tendências, status), alertas e recomendações visuais.

### 6.6. Weekly Reports

*   **Mobile:** Card dentro do Dashboard, resumo conciso.
*   **Desktop:** Pode ter uma seção dedicada (`sec-reports`) na sidebar, com visualizações mais ricas e detalhadas, talvez com gráficos de evolução semanal.

### 6.7. Race IQ

*   **Mobile:** Card com previsão e base.
*   **Desktop:** Pode expandir para incluir gráficos de pace, volume por zona, comparação com metas e histórico de provas.
