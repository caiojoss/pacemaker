# Reporte de bugs por testers

Testers devem reportar defeitos com contexto suficiente para reproducao, sem compartilhar informacao sensivel.

## Canal e informacoes minimas

O canal oficial e definido pela operacao do programa de testers (Issue #15). O reporte deve informar:

- ambiente usado: Production ou Preview;
- URL/deployment, quando aplicavel;
- passos para reproduzir;
- resultado esperado e resultado observado;
- horario aproximado e dispositivo/navegador;
- screenshot, video ou mensagem de erro sanitizada, quando util.

Nao enviar tokens, chaves, refresh tokens, conteudo de conversas privadas, dados de saude ou exportacoes integrais do estado do atleta.

## Triagem

- **P0:** indisponibilidade, exposicao de dados, falha de autenticacao ampla ou recomendacao potencialmente insegura. Pausar a ampliacao do beta e avaliar rollback.
- **P1:** fluxo importante quebrado com contorno seguro. Priorizar correcao antes de expandir testers.
- **P2:** defeito com baixo impacto ou melhoria de experiencia. Registrar e planejar.

Toda correcao deve gerar ou atualizar uma Issue, seguir branch/PR/Preview e registrar a validacao no Pull Request.
