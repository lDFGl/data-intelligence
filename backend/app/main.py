from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FG Data Intelligence API",
    version="0.1.0",
    description="API inicial da plataforma FG Data Intelligence.",
)

# Local development only. Production origins must be explicitly configured.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "fg-data-intelligence-api", "version": "0.1.0"}


@app.get("/", include_in_schema=False)
async def root() -> dict[str, str]:
    return {"message": "FG Data Intelligence API", "docs": "/docs"}
