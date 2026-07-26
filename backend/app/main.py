from fastapi import FastAPI

from sqlalchemy import select

from app.database import SessionLocal
from app.models import Ingredient
from app.schemas import IngredientCreate

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

@app.post("/ingredients")
def create_ingredient(request: IngredientCreate):

    db = SessionLocal()

    ingredient = Ingredient(
        name=request.name,
        quantity=request.quantity,
    )

    db.add(ingredient)

    db.commit()

    db.refresh(ingredient)

    db.close()

    return ingredient