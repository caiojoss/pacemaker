# Contribuindo para o Pacemaker

O Pacemaker usa um fluxo baseado em Issue, branch, Pull Request, Preview e squash merge. A referencia completa e [docs/engineering-workflow.md](docs/engineering-workflow.md).

## Inicio rapido

O repositorio atual e uma aplicacao estatica baseada principalmente em `index.html`, com uma Function Vercel em `api/strava/token.js`. Nao ha instalacao de dependencias nem suite de testes configurada neste momento.

Antes de iniciar trabalho:

1. Leia a Issue e seus criterios de aceite.
2. Atualize `main` localmente.
3. Crie uma branch vinculada a Issue, por exemplo `fix/7-restringir-cors-strava`.
4. Mantenha o escopo limitado ao que a Issue descreve.
5. Abra um Pull Request usando o template do repositorio.

## Branches e commits

- Nunca implemente features ou correcoes diretamente em `main`.
- Use `feat/`, `fix/`, `chore/`, `docs/` ou `test/`, seguidos do numero da Issue e de uma descricao curta.
- Prefira commits pequenos e descritivos, por exemplo `docs: add tester bug reporting process`.
- O merge padrao e squash merge depois de aprovacao e validacao do Preview.

## Pull Requests

- Todo PR deve referenciar a Issue relacionada.
- Use `Closes #ID` apenas quando todos os criterios de aceite forem cumpridos.
- Registre testes, validacao manual, riscos e rollback no template.
- Para UI, anexe evidencia da validacao visual do Preview.

## Qualidade atual

O workflow ja exige validacao manual em Preview. A CI inicial valida a sintaxe da Function Vercel e a presenca dos documentos operacionais. ESLint, Prettier, testes unitarios e Playwright ainda nao estao configurados; nao os declare como executados ate suas Issues dedicadas serem entregues.

## Seguranca

Nunca inclua chaves, tokens Strava, dados de atletas, conversas ou dados de saude em Issues, PRs, screenshots, logs ou commits. Consulte [SECURITY.md](SECURITY.md) para reporte responsavel e ownership de segredos.
