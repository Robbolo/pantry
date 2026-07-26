from fastapi import FastAPI

from app.routers import ingredients_router


app = FastAPI(
    title="Kitchen Inventory API",
)


app.include_router(
    ingredients_router
)


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }