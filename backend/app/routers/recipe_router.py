from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.dependencies import get_current_user_id, get_db
from app.unit_conversion import units_are_compatible, convert_to_base_unit
from app.models import Recipe, RecipeIngredient, Ingredient, PantryItem
from app.schemas import (
    RecipeCreate,
    RecipeUpdate,
    RecipeResponse,
    RecipeIngredientCreate,
    RecipeIngredientResponse,
    RecipeIngredientUpdate,
    RecipeDetailResponse,
    RecipeAvailabilityResponse,
    RecipeIngredientAvailabilityResponse,
    IngredientAvailabilityStatus,
)


router = APIRouter(
    prefix="/recipes",
    tags=["recipes"],
)

# GET request to return all current user's recipes
@router.get(
    "",
    response_model=list[RecipeAvailabilityResponse],
)
def get_recipes(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipes = db.scalars(
        select(Recipe)
        .options(
            selectinload(Recipe.recipe_ingredients)
            .selectinload(RecipeIngredient.ingredient)
        )
        .where(Recipe.user_id == user_id)
        .order_by(Recipe.id)
    ).all()

    pantry_items = db.scalars(
        select(PantryItem).where(
            PantryItem.user_id == user_id
        )
    ).all()

    pantry_items_by_ingredient = {
        item.ingredient_id: item
        for item in pantry_items
    }

    response: list[RecipeAvailabilityResponse] = []

    for recipe in recipes:
        ingredient_availability = []

        for requirement in recipe.recipe_ingredients:
            pantry_item = pantry_items_by_ingredient.get(
                requirement.ingredient_id
            )

            if pantry_item is None:
                quantity_in_pantry = 0
                pantry_unit = None
                status = IngredientAvailabilityStatus.missing

            else:
                quantity_in_pantry = pantry_item.quantity
                pantry_unit = pantry_item.unit

                if quantity_in_pantry == 0:
                    status = IngredientAvailabilityStatus.missing

                elif not units_are_compatible(
                    pantry_item.unit,
                    requirement.unit,
                ):
                    status = (
                        IngredientAvailabilityStatus.incompatible
                    )

                else:
                    pantry_quantity_base = convert_to_base_unit(
                        pantry_item.quantity,
                        pantry_item.unit,
                    )

                    required_quantity_base = convert_to_base_unit(
                        requirement.quantity_required,
                        requirement.unit,
                    )

                    if (
                        pantry_quantity_base
                        < required_quantity_base
                    ):
                        status = (
                            IngredientAvailabilityStatus.insufficient
                        )
                    else:
                        status = (
                            IngredientAvailabilityStatus.enough
                        )

            ingredient_availability.append(
                RecipeIngredientAvailabilityResponse(
                    recipe_ingredient_id=requirement.id,
                    ingredient_id=requirement.ingredient_id,
                    name=requirement.ingredient.name,
                    quantity_required=(
                        requirement.quantity_required
                    ),
                    required_unit=requirement.unit,
                    quantity_in_pantry=quantity_in_pantry,
                    pantry_unit=pantry_unit,
                    status=status,
                )
            )

        ingredients_available = sum(
            item.status
            == IngredientAvailabilityStatus.enough
            for item in ingredient_availability
        )

        ingredients_required = len(
            ingredient_availability
        )

        response.append(
            RecipeAvailabilityResponse(
                id=recipe.id,
                name=recipe.name,
                ingredients_available=ingredients_available,
                ingredients_required=ingredients_required,
                can_make=(
                    ingredients_required > 0
                    and ingredients_available
                    == ingredients_required
                ),
                ingredients=ingredient_availability,
            )
        )

    return response

# POST request to make a new named recipe for a user
@router.post(
    "",
    response_model=RecipeResponse,
)
def create_recipe(
    request: RecipeCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = Recipe(
        name=request.name,
        user_id=user_id,
    )

    db.add(recipe)
    db.commit()
    db.refresh(recipe)

    return recipe

# PUT request to update an existing recipe name
@router.put(
    "/{recipe_id}",
    response_model=RecipeResponse,
)

def update_recipe(
    recipe_id: int,
    request: RecipeUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):

    recipe = db.scalar(
    select(Recipe).where(
        Recipe.id == recipe_id,
        Recipe.user_id == user_id,
    )
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

# DELETE request to remove a named recipe from a user
@router.delete(
    "/{recipe_id}",
    status_code=204,
)
def delete_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    db.delete(recipe)
    db.commit()

    ## now do the recipe_ingredients endpoints for contents of the recipe

# GET request to get the ingredients attached to a users given recipe
@router.get(
    "/{recipe_id}/ingredients",
    response_model=RecipeDetailResponse,
)
def get_recipe_ingredients(
    recipe_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    recipe_ingredients = db.scalars(
        select(RecipeIngredient)
        .where(
            RecipeIngredient.recipe_id == recipe_id
        )
        .order_by(RecipeIngredient.id)
    ).all()

    return RecipeDetailResponse(
        id=recipe.id,
        name=recipe.name,
        ingredients=[
            RecipeIngredientResponse(
                id=item.id,
                ingredient_id=item.ingredient_id,
                name=item.ingredient.name,
                quantity_required=item.quantity_required,
                unit=item.unit,
            )
            for item in recipe_ingredients
        ],
    )

# POST request to add an ingredient to a user's given recipe
@router.post(
    "/{recipe_id}/ingredients",
    response_model=RecipeIngredientResponse,
)
def add_recipe_ingredient(
    recipe_id: int,
    request: RecipeIngredientCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
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

    recipe_ingredient = RecipeIngredient(
        recipe_id=recipe_id,
        ingredient_id=ingredient.id,
        quantity_required=request.quantity_required,
        unit=request.unit.value,
    )

    db.add(recipe_ingredient)
    db.commit()
    db.refresh(recipe_ingredient)

    return RecipeIngredientResponse(
        id=recipe_ingredient.id,
        ingredient_id=recipe_ingredient.ingredient_id,
        name=ingredient.name,
        quantity_required=recipe_ingredient.quantity_required,
        unit=recipe_ingredient.unit,
    )

# PUT request to update an ingredient quantity in a user's given recipe
@router.put(
    "/{recipe_id}/ingredients/{recipe_ingredient_id}",
    response_model=RecipeIngredientResponse,
)
def update_recipe_ingredient(
    recipe_id: int,
    recipe_ingredient_id: int,
    request: RecipeIngredientUpdate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    recipe_ingredient = db.scalar(
        select(RecipeIngredient).where(
            RecipeIngredient.id == recipe_ingredient_id,
            RecipeIngredient.recipe_id == recipe_id,
        )
    )

    if recipe_ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe ingredient not found",
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

    recipe_ingredient.ingredient_id = ingredient.id
    recipe_ingredient.quantity_required = (
        request.quantity_required
    )
    recipe_ingredient.unit = request.unit.value

    db.commit()
    db.refresh(recipe_ingredient)

    return RecipeIngredientResponse(
        id=recipe_ingredient.id,
        ingredient_id=recipe_ingredient.ingredient_id,
        name=ingredient.name,
        quantity_required=recipe_ingredient.quantity_required,
        unit=recipe_ingredient.unit,
    )

# DELETE request to remove an ingredient from a user's given recipe
@router.delete(
    "/{recipe_id}/ingredients/{recipe_ingredient_id}",
    status_code=204,
)
def delete_recipe_ingredient(
    recipe_id: int,
    recipe_ingredient_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    recipe_ingredient = db.scalar(
        select(RecipeIngredient).where(
            RecipeIngredient.id == recipe_ingredient_id,
            RecipeIngredient.recipe_id == recipe_id,
        )
    )

    if recipe_ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe ingredient not found",
        )

    db.delete(recipe_ingredient)
    db.commit()

@router.get(
    "/{recipe_id}",
    response_model=RecipeResponse,
)
def get_recipe(
    recipe_id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id),
):
    recipe = db.scalar(
        select(Recipe).where(
            Recipe.id == recipe_id,
            Recipe.user_id == user_id,
        )
    )

    if recipe is None:
        raise HTTPException(
            status_code=404,
            detail="Recipe not found",
        )

    return recipe