# Roadmap do MVP

## Etapa 1 — Fundação
- [x] Repositório e documentação inicial.
- [ ] Frontend e backend executáveis localmente.
- [ ] Pipeline de testes e verificações estáticas.
- [ ] Banco PostgreSQL e migrações.

## Etapa 2 — Segurança e acesso
- [ ] Autenticação e sessões seguras.
- [ ] Organizações, departamentos, usuários e papéis.
- [ ] Autorização no backend e isolamento RLS.
- [ ] Logs de auditoria.

## Etapa 3 — Importação
- [ ] Upload protegido de CSV/XLSX.
- [ ] Inspeção de abas, cabeçalhos e tipos.
- [ ] Pré-visualização e confirmação.
- [ ] Versionamento e histórico.

## Etapa 4 — Exploração e qualidade
- [ ] Tabela de dados, filtros e paginação.
- [ ] Campos vazios, tipos inválidos e duplicidades.
- [ ] Exportação segura.

## Etapa 5 — Comparação
- [ ] Seleção de duas bases e mapeamento de colunas.
- [ ] Chaves compostas e regras de correspondência.
- [ ] Registros coincidentes, divergentes e ausentes.
- [ ] Rastreabilidade até arquivo, aba e linha de origem.

## Etapa 6 — Relatórios
- [ ] Indicadores e gráficos.
- [ ] Relatório executivo PDF.
- [ ] Exportação detalhada XLSX.

## Critérios de aceite
- Resultados comparados com arquivos de referência e cálculos independentes.
- Nenhuma perda ou conversão silenciosa de registros.
- Testes provam que usuários de um departamento não acessam dados de outro.
- Uploads privados e limites de processamento aplicados.
- Relatórios reproduzem os parâmetros e a versão dos dados analisados.

Integrações com sistemas corporativos e recursos de IA não fazem parte do MVP.
