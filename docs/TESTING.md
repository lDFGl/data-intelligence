# Estratégia de testes

## Testes automatizados

- Backend: Pytest para endpoints, serviços, validação e regras de análise.
- Frontend: Vitest/React Testing Library a adicionar quando os primeiros fluxos interativos forem implementados.
- Integração: PostgreSQL real em ambiente isolado quando as migrações forem introduzidas.
- Segurança: testes negativos de autorização e isolamento entre departamentos.

## Dados de teste

Utilizar somente arquivos sintéticos, criados especificamente para testes. Não utilizar bases de produção nem dados pessoais.

## Portões de homologação

1. Build do frontend concluído.
2. Testes do backend aprovados.
3. Sem vulnerabilidades críticas/altas não tratadas nas dependências.
4. Testes de isolamento departamental aprovados.
5. Comparações validadas contra resultados calculados independentemente.
6. Backup restaurado em ambiente de teste.
7. Aprovação do responsável pelo sistema antes de produção.
