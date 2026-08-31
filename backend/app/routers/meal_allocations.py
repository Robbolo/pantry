from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.dependencies import get_current_user_id, get_db
from app.models import MealAllocation, MealPrep
from app.schemas import (
    MealAllocationCreate,
    MealAllocationUpdate,
    MealAllocationResponse,
)


router = APIRouter(
    prefix="/meal-allocations",
    tags=["meal-allocations"],
)


@router.post(
    "",
    response_model=MealAllocationResponse,
)
def create_meal_allocation(
    request: MealAllocationCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    meal_prep = db.scalar(
        select(MealPrep).where(
            MealPrep.id == request.meal_prep_id,
            MealPrep.user_id == user_id,
        )
    )

    if meal_prep is None:
        raise HTTPException(
            status_code=404,
            detail="Meal prep not found",
        )

    servings_allocated = db.scalar(
        select(
            func.coalesce(
                func.sum(MealAllocation.servings),
                0,
            )
        ).where(
            MealAllocation.meal_prep_id
            == request.meal_prep_id
        )
    )

    servings_remaining = (
        meal_prep.servings_made
        - servings_allocated
    )

    if request.servings > servings_remaining:
        raise HTTPException(
            status_code=400,
            detail="Not enough servings remaining",
        )

    allocation = MealAllocation(
        user_id=user_id,
        meal_prep_id=request.meal_prep_id,
        meal_date=request.meal_date,
        meal_type=request.meal_type.value,
        servings=request.servings,
    )

    db.add(allocation)
    db.commit()
    db.refresh(allocation)

    return allocation


@router.get(
    "",
    response_model=list[MealAllocationResponse],
)
def get_meal_allocations(
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

    allocations = db.scalars(
        select(MealAllocation)
        .where(
            MealAllocation.user_id == user_id,
            MealAllocation.meal_date >= start_date,
            MealAllocation.meal_date <= end_date,
        )
        .order_by(
            MealAllocation.meal_date,
            MealAllocation.meal_type,
            MealAllocation.id,
        )
    ).all()

    return [
        MealAllocationResponse(
            id=allocation.id,
            meal_prep_id=allocation.meal_prep_id,
            recipe_name=allocation.meal_prep.recipe.name,
            meal_date=allocation.meal_date,
            meal_type=allocation.meal_type,
            servings=allocation.servings,
        )
        for allocation in allocations
    ]

@router.put(
    "/{meal_allocation_id}",
    response_model=MealAllocationResponse,
)
def update_meal_allocation(
    meal_allocation_id: int,
    request: MealAllocationUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    allocation = db.scalar(
        select(MealAllocation).where(
            MealAllocation.id == meal_allocation_id,
            MealAllocation.user_id == user_id,
        )
    )

    if allocation is None:
        raise HTTPException(
            status_code=404,
            detail="Meal allocation not found",
        )

    meal_prep = db.scalar(
        select(MealPrep).where(
            MealPrep.id == allocation.meal_prep_id,
            MealPrep.user_id == user_id,
        )
    )

    if meal_prep is None:
        raise HTTPException(
            status_code=404,
            detail="Meal prep not found",
        )

    servings_allocated_elsewhere = db.scalar(
        select(
            func.coalesce(
                func.sum(MealAllocation.servings),
                0,
            )
        ).where(
            MealAllocation.meal_prep_id
            == allocation.meal_prep_id,
            MealAllocation.id
            != meal_allocation_id,
        )
    )

    servings_available = (
        meal_prep.servings_made
        - servings_allocated_elsewhere
    )

    if request.servings > servings_available:
        raise HTTPException(
            status_code=400,
            detail="Not enough servings remaining",
        )

    allocation.meal_date = request.meal_date
    allocation.meal_type = request.meal_type.value
    allocation.servings = request.servings

    db.commit()
    db.refresh(allocation)

    return allocation

@router.delete(
    "/{meal_allocation_id}",
    status_code=204,
)
def delete_meal_allocation(
    meal_allocation_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    allocation = db.scalar(
        select(MealAllocation).where(
            MealAllocation.id == meal_allocation_id,
            MealAllocation.user_id == user_id,
        )
    )

    if allocation is None:
        raise HTTPException(
            status_code=404,
            detail="Meal allocation not found",
        )

    db.delete(allocation)
    db.commit()