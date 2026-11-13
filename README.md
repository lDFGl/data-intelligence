# FG Data Intelligence

Plataforma modular em desenvolvimento para importação, validação, cruzamento e análise de dados, com geração futura de indicadores e relatórios executivos.

> **Status:** protótipo demonstrativo. O GitHub Pages publica somente uma aplicação estática no navegador; não é uma aplicação corporativa pronta para produção.

## Demonstração pública

https://ldfgl.github.io/data-intelligence/

### Recursos demonstrativos disponíveis

- **Excel (.xlsx):** leitura local de abas visíveis, seleção de aba e pré-visualização de até 100 registros. Limite demonstrativo de 10 MB, 20 mil linhas e 100 colunas por aba.
- **CSV (.csv):** leitura local com detecção simples de delimitador vírgula/ponto e vírgula e pré-visualização de até 100 registros.
- **PDF (.pdf):** extração e pré-visualização de texto de até 20 páginas e 100 mil caracteres.
- Os três formatos são processados no navegador; os arquivos não são enviados para API nem armazenados pelo projeto.

### Limitações importantes

- PDFs digitalizados como imagem precisam de OCR, que ainda não está implementado.
- PDFs protegidos por senha podem não ser processados.
- Fórmulas de Excel não são executadas; células com fórmulas são identificadas como não executadas.
- A demonstração não realiza cruzamentos automáticos, análise de qualidade ou geração de relatórios.
- O conteúdo completo não é apresentado na tela; a interface mostra uma prévia limitada.

Use somente arquivos fictícios, sem dados pessoais, financeiros, corporativos ou confidenciais. Embora o processamento ocorra localmente, o site e seu código são públicos e esta demonstração não oferece autenticação ou controles corporativos.

## Próximas etapas

- Validação de estrutura, tipos, duplicidades e campos vazios.
- Comparação de bases por chaves configuráveis.
- OCR opcional para PDFs digitalizados.
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
