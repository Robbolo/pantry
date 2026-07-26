from fastapi import FastAPI

from sqlalchemy import select

from app.database import SessionLocal
from app.models import Ingredient
from app.schemas import IngredientCreate, IngredientResponse

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

@app.post("/ingredients", response_model=IngredientResponse)
def create_ingredient(request: IngredientCreate):

    with SessionLocal() as db:

        ingredient = Ingredient(
            name=request.name,
            quantity=request.quantity,
        )

        db.add(ingredient)

        db.commit()

        db.refresh(ingredient)

        return ingredient

@app.get("/ingredients", response_model=list[IngredientResponse])
def get_ingredients():

    with SessionLocal() as db:

        ingredients = db.scalars(
            select(Ingredient)
        ).all()

        return ingredients