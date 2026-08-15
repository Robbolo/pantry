from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user_id
from app.models import MealPrep, Recipe, User
from app.schemas import (
MealPrepCreate, 
MealPrepUpdate,
MealPrepResponse,
)

router = APIRouter(
    prefix="/meal-preps",
    tags=["meal-preps"],
)


@router.post(
    "",
    response_model=MealPrepResponse,
)
def create_meal_prep(
    request: MealPrepCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == request.recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    meal_prep = MealPrep(
        user_id=user_id,
        recipe_id=request.recipe_id,
        prep_date=request.prep_date,
        servings_made=request.servings_made,
    )

    db.add(meal_prep)
    db.commit()
    db.refresh(meal_prep)

    return meal_prep