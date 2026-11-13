# FG Data Intelligence

Plataforma modular em desenvolvimento para importação, validação, cruzamento e análise de dados, com geração futura de indicadores e relatórios executivos.

> **Status:** protótipo inicial. O GitHub Pages publica somente uma demonstração estática do frontend. Não é uma aplicação corporativa pronta para produção.

## Demonstração pública

Após a habilitação do GitHub Pages pelo workflow, a interface ficará disponível em:

https://ldfgl.github.io/data-intelligence/

### Recurso disponível nesta versão

- **Pré-visualização de CSV:** seleção de arquivo no navegador, leitura de cabeçalhos e visualização de até 100 registros.
- Limite de arquivo de 5 MB.
- O arquivo é processado localmente no navegador; não é enviado para API ou armazenado pelo projeto.
- A demonstração não persiste os dados e não realiza cruzamentos entre bases.

Use somente arquivos fictícios, sem dados pessoais, financeiros, corporativos ou confidenciais. Embora o processamento do CSV ocorra localmente, o site e seu código são públicos e esta demonstração não oferece autenticação ou controles corporativos.

## Próximas etapas

- Leitura e pré-visualização de Excel (.xlsx).
- Validação de estrutura, tipos, duplicidades e campos vazios.
- Comparação de bases por chaves configuráveis.
- API FastAPI, autenticação, autorização por departamento e PostgreSQL.
- Armazenamento privado, trilhas de auditoria e relatórios executivos.

## Arquitetura planejada

- **Frontend:** React + TypeScript + Vite.
- **Backend:** Python + FastAPI.
- **Processamento:** Pandas e OpenPyXL.
- **Banco de dados:** PostgreSQL.
- **Mobile:** interface responsiva; PWA em etapa própria.

## Estrutura

- `frontend/`: aplicação web.
- `backend/`: API e serviços analíticos.
- `docs/`: arquitetura, segurança e plano de entregas.
- `infrastructure/`: configuração local e implantação.

## Desenvolvimento local

Consulte [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Segurança

Consulte [SECURITY.md](SECURITY.md). Não envie planilhas reais, documentos corporativos, credenciais, tokens ou dados pessoais para este repositório. A versão pública é exclusivamente uma demonstração com dados fictícios.

## Princípios

1. Confiabilidade e rastreabilidade antes de automação inteligente.
2. Controle de acesso no backend e no banco, não apenas na interface.
3. Dados de departamentos isolados por padrão.
4. Cálculos financeiros com precisão decimal.
5. Testes e homologação antes de produção.

## Licença

Uso interno/proprietário. Não há concessão de licença para redistribuição.
