from datetime import date

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



@router.get(
    "",
    response_model=list[MealPrepResponse],
)
def get_meal_preps(
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):

    if end_date < start_date:
        raise HTTPException(
            status_code=400,
            detail="end_date must be on or after start_date",
        )
    
    meal_preps = db.scalars(
        select(MealPrep)
        .where(
            MealPrep.user_id == user_id,
            MealPrep.prep_date >= start_date,
            MealPrep.prep_date <= end_date,
        )
        .order_by(
            MealPrep.prep_date,
            MealPrep.id,
        )
    ).all()

    return meal_preps