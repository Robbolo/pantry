from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import ingredients_router


app = FastAPI(
    title="Kitchen Inventory API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    ingredients_router
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }