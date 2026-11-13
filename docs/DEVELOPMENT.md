# Desenvolvimento local

## Pré-requisitos

- Node.js 20 ou superior.
- Python 3.11 ou superior.
- Git.
- Docker Desktop (opcional nesta primeira etapa; necessário quando o banco local for adicionado).

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API: http://127.0.0.1:8000  
Documentação OpenAPI local: http://127.0.0.1:8000/docs

## Configuração

Copie `.env.example` para `.env` quando necessário. Nunca comite o arquivo `.env`.

## Estado

A fundação inicial ainda não inclui banco de dados, autenticação, armazenamento de uploads ou processamento de arquivos. Esses componentes serão implementados e testados em etapas separadas.
