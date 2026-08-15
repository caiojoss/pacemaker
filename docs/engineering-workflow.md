# Engineering Workflow

Este documento define o fluxo oficial de engenharia do Pacemaker para a fase de testers. Ele se aplica a toda alteracao versionada do projeto, incluindo codigo, configuracao, testes e documentacao.

> **Status:** workflow adotado em 15 de agosto de 2026. Os controles tecnicos que ainda nao existem no repositorio estao identificados explicitamente como **planejados** ou **a configurar**; eles nao devem ser tratados como ja ativos.

## Git Workflow

- `main` representa a producao.
- Nunca trabalhar diretamente em `main` para features, correcoes ou alteracoes de configuracao versionada.
- Cada Issue deve ter uma branch propria, criada a partir de `main` atualizada.
- Usar uma das convencoes abaixo, substituindo `ID` pelo numero da Issue:
  - `feat/ID-descricao-curta`
  - `fix/ID-descricao-curta`
  - `chore/ID-descricao-curta`
  - `docs/ID-descricao-curta`
  - `test/ID-descricao-curta`
- Fazer commits pequenos, coesos e descritivos. Um commit deve explicar **o que** mudou e, quando nao for obvio, **por que**. Evitar commits genericos como `fix`, `update` ou `wip`.
- Preferir squash merge para manter `main` com uma unidade de mudanca rastreavel por Issue/PR.

## Issue -> Branch -> Pull Request

1. Toda tarefa deve possuir uma Issue antes do inicio do trabalho.
2. Toda feature, correcao, teste, mudanca de infraestrutura ou documentacao deve referenciar uma Issue.
3. Criar a branch vinculada a essa Issue conforme a convencao de nomes.
4. Abrir Pull Request para `main` e mencionar explicitamente a Issue relacionada no corpo do PR.
5. Quando o PR resolver integralmente a tarefa, incluir `Closes #ID` no corpo do PR. Nao usar `Closes` se restarem criterios de aceite para outra entrega.
6. Nao fazer merge enquanto os criterios de aceite da Issue, os checks aplicaveis e a validacao de Preview nao estiverem cumpridos.
7. A Issue e encerrada apos o merge. Se o PR nao a resolver integralmente, manter a Issue aberta e registrar o trabalho restante.

## Vercel

- A branch principal (`main`) e a unica fonte de mudancas de **Production**.
- Todo Pull Request deve receber um **Preview Deployment** da Vercel quando essa integracao estiver configurada para o repositorio.
- A validacao manual deve ocorrer na URL de Preview antes do merge, inclusive para alteracoes de UI, fluxos de autenticacao e integracoes.
- Production so recebe mudancas depois da aprovacao do PR e do merge em `main`.
- Nao usar credenciais de producao para testar fluxos inseguros em Preview. OAuth e variaveis de ambiente devem respeitar a separacao definida para cada ambiente.
- O procedimento de rollback deve apontar para o deployment anterior conhecido como saudavel.

> A configuracao efetiva de Production Branch, Preview Deployments, ambientes e rollback no painel Vercel ainda deve ser verificada/configurada na Issue #5.

## Pull Request

Todo PR deve conter, no minimo:

- a Issue relacionada e `Closes #ID` quando aplicavel;
- resumo objetivo da mudanca;
- escopo incluido;
- itens explicitamente fora de escopo, quando isso reduzir ambiguidade;
- lista dos arquivos alterados ou uma explicacao por area afetada;
- testes executados e seus resultados;
- riscos, limitacoes e plano de rollback quando houver impacto operacional;
- checklist de qualidade aplicavel;
- checklist visual para qualquer mudanca de UI, incluindo validacao em Preview e os breakpoints/dispositivos relevantes.

PRs devem ser pequenos o suficiente para revisao efetiva. Mudancas independentes nao devem ser agrupadas apenas por conveniencia de deploy.

## Definition of Done

Uma tarefa so esta pronta quando todos os itens aplicaveis estiverem atendidos:

- codigo, configuracao ou documentacao implementados conforme o escopo;
- testes relevantes executados e registrados no PR;
- lint e verificacao de formatacao aprovados, quando essas ferramentas estiverem configuradas;
- sem regressoes conhecidas nos fluxos afetados;
- documentacao atualizada quando necessario;
- Preview validado manualmente;
- PR aprovado conforme a politica de revisao vigente;
- mudanca mergeada em `main`;
- Issue encerrada apos o merge, automaticamente por `Closes #ID` ou manualmente com justificativa.

Uma excecao a qualquer item deve ser registrada no PR, com risco aceito, responsavel e plano para quitar a pendencia. Excecoes nao transformam um requisito ausente em requisito cumprido.

## Quality Gates

### Adotado

| Pratica ou ferramenta | Situacao real | Como atua no workflow |
| --- | --- | --- |
| GitHub Issues | Adotado. O backlog de preparacao para testers esta registrado nas Issues #4 a #27. | Toda unidade de trabalho nasce em uma Issue e e ligada ao PR. |
| Pull Request + revisao | Adotado como politica deste documento. | Todo trabalho versionado deve passar por PR antes de chegar a `main`. A protecao tecnica da branch ainda esta pendente. |
| Validacao manual em Preview | Adotado como criterio de processo. | O responsavel registra no PR a URL/resultado da validacao antes do merge. |
| Documentacao de contratos e riscos | Ja existente em `docs/contract-inventory.md`, `docs/contract-freeze.md` e `docs/migration-risk-register.md`. | Serve de referencia para regressao manual enquanto a cobertura automatizada nao existe. |
| Vercel Analytics e Speed Insights | Ja referenciados pelo frontend. | Sao observabilidade de uso/performance; nao substituem rastreamento de erros nem sao um gate de merge. |

### Planejado e aprovado no backlog

| Ferramenta ou gate | Issue | Estado atual |
| --- | --- | --- |
| ESLint e Prettier com scripts reprodutiveis | #10 | Planejado; nao ha `package.json`, ESLint ou Prettier no repositorio hoje. |
| GitHub Actions para lint e formatacao | #11 | A fundacao minima existe no checkout e se torna ativa quando enviada ao GitHub; lint e formatacao continuam planejados na Issue #10. |
| Smoke tests automatizados | #12 | Planejado; nao ha suite automatizada hoje. |
| Observabilidade de erros com identificacao de release | #14 | Planejado; nao ha rastreador de erros configurado hoje. |
| Playwright E2E com mocks | #20 | Planejado; Playwright nao esta configurado hoje. |
| Testes unitarios da logica critica | #21 | Planejado; a logica ainda esta majoritariamente no `index.html`. |
| Changelog e processo de release | #22 | Documentacao inicial adicionada; a operacao deve ser validada em uma release futura. |
| Cobertura, performance e auditoria de dependencias no CI | #27 | Planejado; nao ha gate desse tipo hoje. |

### A configurar antes de depender do gate

| Controle | Issue | Condicao para ser considerado ativo |
| --- | --- | --- |
| Protecao de `main` e checks obrigatorios | #4 | A regra do GitHub deve estar ativa e os checks devem bloquear merge quando falharem. |
| Production em `main`, Preview por PR e rollback na Vercel | #5 | A configuracao precisa ser confirmada no painel Vercel e exercitada em PR de teste. |
| Separacao de variaveis por ambiente | #6 | Os escopos Preview/Production devem estar inventariados e validados sem expor segredos. |
| Politica segura de CORS e OAuth do Strava | #7 e #8 | A allowlist e o fluxo de Preview devem ser implementados/testados antes de testers externos. |
| Regras de acesso Firebase | #9 | As regras devem ser auditadas, aplicadas e testadas com usuarios distintos. |

Enquanto um item estiver em **planejado** ou **a configurar**, ele nao pode ser citado no PR como check automatico ou controle ja configurado. O PR deve registrar a validacao manual alternativa aplicavel.

## Referencias

- [Backlog de preparacao para testers](https://github.com/caiojoss/pacemaker/issues)
- [Inventario de contratos](contract-inventory.md)
- [Congelamento de contratos](contract-freeze.md)
- [Registro de riscos de migracao](migration-risk-register.md)
- [Contribuicao](../CONTRIBUTING.md)
- [Politica de seguranca](../SECURITY.md)
- [Release e rollback](release-and-rollback.md)
- [Reporte de bugs por testers](tester-bug-reporting.md)
