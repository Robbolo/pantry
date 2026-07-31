from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.dependencies import get_db
from backend.app.models import Ingredient
from app.schemas import (
    IngredientCreate,
    IngredientUpdate,
    IngredientResponse,
)


router = APIRouter(
    prefix="/ingredients",
    tags=["ingredients"],
)

@router.get(
    "",
    response_model=list[IngredientResponse],
)
def get_ingredients(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(Ingredient)
        .order_by(Ingredient.id)
    ).all()

@router.post(
    "",
    response_model=IngredientResponse,
)
def create_ingredient(
    request: IngredientCreate,
    db: Session = Depends(get_db),
):

    ingredient = Ingredient(
        name=request.name,
        quantity=request.quantity,
    )

    db.add(ingredient)
    db.commit()
    db.refresh(ingredient)

    return ingredient

@router.put(
    "/{ingredient_id}",
    response_model=IngredientResponse,
)
def update_ingredient(
    ingredient_id: int,
    request: IngredientUpdate,
    db: Session = Depends(get_db),
):

    ingredient = db.get(
        Ingredient,
        ingredient_id,
    )

    if ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not found",
        )

    ingredient.name = request.name
    ingredient.quantity = request.quantity

    db.commit()
    db.refresh(ingredient)

    return ingredient

@router.delete(
    "/{ingredient_id}",
    status_code=204,
)
def delete_ingredient(
    ingredient_id: int,
    db: Session = Depends(get_db),
):

    ingredient = db.get(
        Ingredient,
        ingredient_id,
    )

    if ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not found",
        )

    db.delete(ingredient)
    db.commit()

@router.patch("/{ingredient_id}/increment")
def increment_ingredient(
    ingredient_id: int,
    db: Session = Depends(get_db),
):
    ingredient = db.get(
        Ingredient,
        ingredient_id,
    )

    if not ingredient:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not found",
        )

    ingredient.quantity += 1

    db.commit()
    db.refresh(ingredient)

    return ingredient

@router.patch("/{ingredient_id}/decrement")
def decrement_ingredient(
    ingredient_id: int,
    db: Session = Depends(get_db),
):
    ingredient = db.get(
        Ingredient,
        ingredient_id,
    )

    if not ingredient:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not found",
        )

    ingredient.quantity -= 1

    db.commit()
    db.refresh(ingredient)

    return ingredient