from fastapi import FastAPI
from .core.config import settings
from .api.v1.endpoints import training

app = FastAPI()
app.include_router(training.router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
