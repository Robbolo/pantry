from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models import Recipe
from app.schemas import (
    RecipeCreate,
    RecipeUpdate,
    RecipeResponse,
)


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
)

@router.get(
    "",
    response_model=list[RecipeResponse],
)
def get_recipe(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(Recipe)
        .order_by(Recipe.id)
    ).all()

@router.post(
    "",
    response_model=RecipeResponse,
)
def create_recipe(
    request: RecipeCreate,
    db: Session = Depends(get_db),
):

    recipe = Recipe(
        name=request.name,
    )

    db.add(recipe)
    db.commit()
    db.refresh(recipe)

    return recipe

@router.put(
    "/{recipe_id}",
    response_model=RecipeResponse,
)
def update_recipe(
    recipe_id: int,
    request: RecipeUpdate,
    db: Session = Depends(get_db),
):

    recipe = db.get(
        Recipe,
        recipe_id,
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    recipe.name = request.name

    db.commit()
    db.refresh(recipe)

    return recipe

@router.delete(
    "/{recipe_id}",
    status_code=204,
)
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
):

    recipe = db.get(
        Recipe,
        recipe_id,
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    db.delete(recipe)
    db.commit()