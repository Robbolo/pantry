from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user_id
from app.models import MealPrep, Recipe, User, MealAllocation
from app.schemas import (
MealPrepCreate, 
MealPrepUpdate,
MealPrepResponse,
AvailableMealPrepResponse
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

@router.put(
    "/{meal_prep_id}",
    response_model=MealPrepResponse,
)
def update_meal_prep(
    meal_prep_id: int,
    request: MealPrepUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):

    servings_allocated = db.scalar(
    select(
        func.coalesce(
            func.sum(MealAllocation.servings),
            0,
        )
    ).where(
        MealAllocation.meal_prep_id
        == meal_prep_id
        )
    )

    meal_prep = db.scalar(
        select(MealPrep).where(
            MealPrep.id == meal_prep_id,
            MealPrep.user_id == user_id,
        )
    )

    if meal_prep is None:
        raise HTTPException(
            status_code=404,
            detail="Meal prep not found",
        )

    if request.servings_made < servings_allocated:
        raise HTTPException(
            status_code=400,
            detail=(
                "Servings made cannot be less than "
                "servings already allocated"
            ),
        )

    meal_prep.prep_date = request.prep_date
    meal_prep.servings_made = request.servings_made

    db.commit()
    db.refresh(meal_prep)

    return meal_prep

@router.delete(
    "/{meal_prep_id}",
    status_code=204,
)
def delete_meal_prep(
    meal_prep_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    meal_prep = db.scalar(
        select(MealPrep).where(
            MealPrep.id == meal_prep_id,
            MealPrep.user_id == user_id,
        )
    )

    if meal_prep is None:
        raise HTTPException(
            status_code=404,
            detail="Meal prep not found",
        )

    db.delete(meal_prep)
    db.commit()


@router.get(
    "/available",
    response_model=list[AvailableMealPrepResponse],
)
def get_available_meal_preps(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    servings_allocated = func.coalesce(
        func.sum(MealAllocation.servings),
        0,
    ).label("servings_allocated")

    results = db.execute(
        select(
            MealPrep,
            servings_allocated,
        )
        .outerjoin(
            MealAllocation,
            MealAllocation.meal_prep_id
            == MealPrep.id,
        )
        .where(
            MealPrep.user_id == user_id,
        )
        .group_by(
            MealPrep.id,
        )
        .having(
            MealPrep.servings_made
            - servings_allocated
            > 0
        )
        .order_by(
            MealPrep.prep_date,
            MealPrep.id,
        )
    ).all()

    response: list[AvailableMealPrepResponse] = []

    for meal_prep, allocated in results:
        response.append(
            AvailableMealPrepResponse(
                id=meal_prep.id,
                recipe_id=meal_prep.recipe_id,
                recipe_name=meal_prep.recipe.name,
                prep_date=meal_prep.prep_date,
                servings_made=meal_prep.servings_made,
                servings_allocated=allocated,
                servings_remaining=(
                    meal_prep.servings_made
                    - allocated
                ),
            )
        )

    return response