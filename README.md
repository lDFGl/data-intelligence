# FG Data Intelligence

Plataforma corporativa modular para importação, validação, cruzamento e análise de dados, com geração de indicadores e relatórios executivos.

> **Status:** fundação técnica inicial. Ainda não é uma aplicação pronta para produção e não deve receber dados corporativos reais ou confidenciais.

## Objetivos da primeira versão

- Importar arquivos Excel (.xlsx) e CSV.
- Pré-visualizar e validar estruturas e registros.
- Explorar dados com filtros.
- Cruzar duas bases por chaves definidas pelo usuário.
- Identificar divergências, duplicidades e registros ausentes.
- Gerar resultados rastreáveis e relatórios executivos.

## Arquitetura inicial

- **Frontend:** React + TypeScript + Vite.
- **Backend:** Python + FastAPI.
- **Processamento:** Pandas e OpenPyXL.
- **Banco de dados:** PostgreSQL (a ser conectado nas próximas etapas).
- **Mobile:** interface responsiva; PWA será habilitada em etapa própria.
- **Estratégia:** monólito modular, com contratos de API explícitos.

## Estrutura

- `frontend/`: aplicação web.
- `backend/`: API e serviços analíticos.
- `docs/`: arquitetura, segurança e plano de entregas.
- `infrastructure/`: configuração local e implantação.

## Desenvolvimento local

Consulte [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Segurança

Consulte [SECURITY.md](SECURITY.md). Nunca envie planilhas reais, documentos corporativos, credenciais, tokens ou dados pessoais para este repositório. O repositório deve permanecer privado antes de qualquer uso corporativo. A configuração atual é apenas uma fundação de desenvolvimento.

## Princípios

1. Confiabilidade e rastreabilidade antes de automação inteligente.
2. Controle de acesso no backend e no banco, não apenas na interface.
3. Dados de departamentos isolados por padrão.
4. Cálculos financeiros com precisão decimal.
5. Testes e homologação antes de produção.

## Licença

Uso interno/proprietário. Não há concessão de licença para redistribuição.
