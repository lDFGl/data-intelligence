# Modelo lógico de dados — proposta

Este documento descreve o modelo alvo. As tabelas ainda não foram criadas no banco.

## Domínio de identidade e acesso

- organizations: organização/tenant.
- departments: departamentos pertencentes à organização.
- users: identidades da plataforma.
- roles / permissions: papéis e permissões.
- user_department_access: vínculo do usuário aos departamentos e seu papel em cada escopo.

## Domínio analítico

- datasets: identidade lógica da base importada.
- dataset_versions: versão imutável de cada importação confirmada.
- dataset_columns: metadados de colunas por versão.
- import_jobs: estado, duração, usuário e resultado de cada importação.
- analysis_jobs: execução de regras sobre uma ou mais versões.
- comparison_jobs: cruzamento de duas bases, com mapeamento e chave(s).
- comparison_rules: regras e tolerâncias aplicadas.
- data_quality_issues: ocorrências com severidade, tipo e referência de origem.
- reports: artefatos gerados e parâmetros de reprodução.
- audit_logs: trilha de ações relevantes.

## Campos transversais

Entidades corporativas deverão ter organization_id; entidades sob escopo departamental deverão ter department_id. Entidades mutáveis deverão considerar datas de criação e atualização e autoria. Exclusões e retenção devem seguir política aprovada, não exclusão física indiscriminada.

## Integridade e rastreabilidade

- Identificadores internos UUID.
- Valores financeiros em NUMERIC/DECIMAL.
- Datas armazenadas com timezone quando representarem instantes.
- Versões de datasets imutáveis após confirmação.
- Resultado de comparação deve apontar versão da base, aba/tabela e número de linha de origem.
- Regras e parâmetros utilizados devem ser preservados junto à execução.

## Segurança

O modelo final deverá implementar chaves estrangeiras, índices, restrições e políticas RLS. As políticas deverão ser testadas com usuários de departamentos distintos antes de habilitar dados reais.
