from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.pantry_item_router import router as pantry_item_router
from app.routers.recipe_router import router as recipe_router
from app.routers.meal_prep_router import router as meal_prep_router
from app.routers.meal_allocations import router as meal_allocations_router


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

app.include_router(pantry_item_router)
app.include_router(recipe_router)
app.include_router(meal_prep_router)
app.include_router(meal_allocations_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }