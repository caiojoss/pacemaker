# Politica de seguranca

## Reporte de vulnerabilidades

Nao abra uma Issue publica para vulnerabilidades que possam expor tokens, contas, dados de atletas, dados de saude ou configuracoes de producao. Comunique-se diretamente com o maintainer do repositorio e inclua apenas o minimo necessario para reproduzir com seguranca.

O reporte deve conter:

- impacto e sistemas afetados;
- passos de reproducao sanitizados;
- evidencias sem segredos ou dados pessoais;
- mitigacao temporaria, quando conhecida.

## Segredos e dados sensiveis

- Segredos de servidor, como `STRAVA_CLIENT_SECRET`, pertencem a variaveis de ambiente da plataforma e nunca ao Git.
- Valores de Firebase, Strava, Gemini, tokens OAuth, headers de autorizacao e dumps de estado nao devem ser incluidos em commits, Issues ou PRs.
- Dados de atletas e de saude devem ser tratados como sensiveis: usar fixtures anonimizadas em testes e exemplos.
- Toda rotacao de segredo deve ter owner, ambiente afetado, janela de mudanca e plano de rollback documentados fora do repositorio publico.

## Controles atuais e pendentes

- CodeQL e Dependabot sao configurados neste repositorio e passam a valer quando o workflow for enviado ao GitHub.
- Secret scanning e protecao de push dependem da configuracao/recursos do GitHub e devem ser verificados no painel; esta configuracao nao e inferida por este documento.
- CORS, OAuth Strava e regras Firebase possuem Issues de seguranca dedicadas e nao sao alterados por esta politica.

## Escopo

Este documento nao substitui regras de Firestore, configuracao de CORS ou implementacao de OAuth. Essas mudancas devem seguir as Issues dedicadas e passar por PR/Preview.
