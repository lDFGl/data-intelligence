# Segurança

## Estado atual

Este repositório contém somente a fundação de desenvolvimento. Não está homologado para produção nem para dados corporativos reais.

## Regras obrigatórias

- Não versionar arquivos Excel/CSV reais, documentos, dados pessoais, credenciais ou tokens.
- Manter o repositório privado antes de qualquer uso corporativo.
- Usar variáveis de ambiente e um gerenciador de segredos no ambiente de implantação.
- Validar arquivos pelo conteúdo, tamanho e formato; não confiar apenas na extensão.
- Armazenar uploads em storage privado, fora da pasta pública da aplicação.
- Aplicar autorização no backend em todas as operações e isolamento departamental no banco.
- Registrar importações, análises, exportações e alterações relevantes.
- Definir retenção, descarte e recuperação de dados antes da produção.

## Reporte de vulnerabilidades

Não publique detalhes de vulnerabilidades em issues públicas. Comunique-as diretamente aos mantenedores do repositório.
