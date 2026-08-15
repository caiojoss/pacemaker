# Release e rollback

Este processo define como promover uma mudanca ja mergeada e como reagir a uma regressao. Ele nao executa deploys manualmente nem substitui a configuracao da Vercel.

## Pre-requisitos de release

1. A Issue esta resolvida e o PR foi aprovado.
2. Os checks configurados passaram e os testes manuais relevantes foram registrados.
3. O Preview Deployment foi validado.
4. Riscos, configuracoes de ambiente e plano de rollback foram revisados.
5. A mudanca foi mergeada por squash em `main`.

## Promocao para Production

1. Confirmar que `main` e a Production Branch configurada na Vercel.
2. Acompanhar o deployment disparado pelo merge em `main`.
3. Validar os fluxos afetados na URL de Production.
4. Criar tag e atualizar o `CHANGELOG.md` somente apos a validacao.

## Rollback

1. Identificar o ultimo deployment saudavel e o impacto da regressao.
2. Se o problema estiver em Production, reverter para o deployment saudavel pela Vercel ou abrir um PR de reversao, conforme o menor risco.
3. Registrar a decisao, o horario, a versao/deployment e o responsavel.
4. Abrir ou atualizar a Issue da regressao com passos de reproducao sanitizados.
5. Corrigir em branch propria, validar em Preview e promover pelo fluxo normal.

## Limites atuais

O mapeamento efetivo de Production Branch, Preview e rollback no painel Vercel deve ser confirmado pela Issue #5. Nao assumir que uma configuracao descrita aqui ja esta ativa sem essa validacao.
