from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user_id
from app.models import Ingredient, PantryItem
from app.schemas import (
    PantryItemCreate,
    PantryItemUpdate,
    PantryItemResponse,
)

router = APIRouter(
    prefix="/pantry-items",
    tags=["pantry-items"],
)


@router.get(
    "",
    response_model=list[PantryItemResponse],
)
def get_pantry_items(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    pantry_items = db.scalars(
        select(PantryItem)
        .where(PantryItem.user_id == user_id)
        .order_by(PantryItem.id)
    ).all()

    return [
        PantryItemResponse(
            id=item.id,
            name=item.ingredient.name,
            quantity=item.quantity,
            unit=item.ingredient.unit,
        )
        for item in pantry_items
    ]


@router.post(
    "",
    response_model=PantryItemResponse,
)
def create_pantry_item(
    request: PantryItemCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    ingredient = db.scalar(
        select(Ingredient).where(
            Ingredient.name == request.name
        )
    )

    if ingredient is None:
        ingredient = Ingredient(
            name=request.name,
        )

        db.add(ingredient)
        db.flush()

    pantry_item = PantryItem(
        user_id=user_id,
        ingredient_id=ingredient.id,
        quantity=request.quantity,
        unit=request.unit.value,
    )

    db.add(pantry_item)
    db.commit()
    db.refresh(pantry_item)

    return PantryItemResponse(
        id=pantry_item.id,
        name=ingredient.name,
        quantity=pantry_item.quantity,
        unit=pantry_item.unit,
    )


@router.put(
    "/{pantry_item_id}",
    response_model=PantryItemResponse,
)
def update_pantry_item(
    pantry_item_id: int,
    request: PantryItemUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    pantry_item = db.scalar(
        select(PantryItem).where(
            PantryItem.id == pantry_item_id,
            PantryItem.user_id == user_id,
        )
    )

    if pantry_item is None:
        raise HTTPException(
            status_code=404,
            detail="Pantry item not found",
        )

    ingredient = db.scalar(
        select(Ingredient).where(
            Ingredient.name == request.name
        )
    )

    if ingredient is None:
        ingredient = Ingredient(
            name=request.name,
        )

        db.add(ingredient)
        db.flush()

    pantry_item.ingredient_id = ingredient.id
    pantry_item.quantity = request.quantity
    pantry_item.unit = request.unit.value

    db.commit()
    db.refresh(pantry_item)

    return PantryItemResponse(
        id=pantry_item.id,
        name=ingredient.name,
        quantity=pantry_item.quantity,
        unit=pantry_item.unit,
    )


@router.delete(
    "/{pantry_item_id}",
    status_code=204,
)
def delete_pantry_item(
    pantry_item_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    pantry_item = db.scalar(
        select(PantryItem).where(
            PantryItem.id == pantry_item_id,
            PantryItem.user_id == user_id,
        )
    )

    if pantry_item is None:
        raise HTTPException(
            status_code=404,
            detail="Pantry item not found",
        )

    db.delete(pantry_item)
    db.commit()


@router.patch(
    "/{pantry_item_id}/increment",
    response_model=PantryItemResponse,
)
def increment_pantry_item(
    pantry_item_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    pantry_item = db.scalar(
        select(PantryItem).where(
            PantryItem.id == pantry_item_id,
            PantryItem.user_id == user_id,
        )
    )

    if pantry_item is None:
        raise HTTPException(
            status_code=404,
            detail="Pantry item not found",
        )

    pantry_item.quantity += 1

    db.commit()
    db.refresh(pantry_item)

    return PantryItemResponse(
        id=pantry_item.id,
        name=pantry_item.ingredient.name,
        quantity=pantry_item.quantity,
    )


@router.patch("/{pantry_item_id}/decrement",
    response_model=PantryItemResponse,
)
def decrement_pantry_item(
    pantry_item_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    pantry_item = db.scalar(
        select(PantryItem).where(
            PantryItem.id == pantry_item_id,
            PantryItem.user_id == user_id,
        )
    )

    if pantry_item is None:
        raise HTTPException(
            status_code=404,
            detail="Pantry item not found",
        )

    pantry_item.quantity = max(
        0,
        pantry_item.quantity - 1
        )

    db.commit()
    db.refresh(pantry_item)

    return PantryItemResponse(
        id=pantry_item.id,
        name=pantry_item.ingredient.name,
        quantity=pantry_item.quantity,
    )

