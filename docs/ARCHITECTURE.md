# Arquitetura inicial

## Decisão

Começar com um monólito modular: frontend React/TypeScript e backend FastAPI. Evita a complexidade prematura de microsserviços e permite separar o motor analítico posteriormente.

## Módulos previstos

1. Identidade, usuários e departamentos.
2. Importação e versionamento de datasets.
3. Exploração de dados.
4. Qualidade e validação.
5. Comparação e cruzamento.
6. Indicadores e relatórios.
7. Auditoria e integrações futuras.

## Fluxo de dados

Upload -> validação de segurança -> leitura/inspeção -> pré-visualização -> confirmação -> processamento -> dataset versionado -> análise -> resultado rastreável -> exportação autorizada.

## Isolamento departamental

Toda entidade corporativa deverá estar vinculada a uma organização e, quando aplicável, a um departamento. O backend deverá validar o escopo em cada requisição. PostgreSQL Row-Level Security será implementado antes da entrada de dados reais; não considerar filtros de interface como controle de segurança.

## Processamento

- CSV e XLSX inicialmente.
- Limites configuráveis de tamanho, linhas, colunas e tempo.
- Tipagem e normalização explícitas, sem conversões silenciosas.
- Valores monetários em Decimal / NUMERIC.
- Cada análise deverá registrar datasets/versões, regras, parâmetros, versão do motor e horário.
- Fórmulas de planilha não serão executadas.
- Exportações deverão neutralizar conteúdo que possa causar CSV/formula injection.

## Integrações

Sienge/Mega, Mobuss e Salesforce ficam fora do escopo funcional inicial. A camada de serviços deverá permitir adaptadores futuros, sem armazenar credenciais no código.
