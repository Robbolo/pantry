from fastapi import FastAPI

app = FastAPI(
    title="Kitchen Inventory API",
    description="API for managing kitchen ingredients",
    version="0.1.0"
)


@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }