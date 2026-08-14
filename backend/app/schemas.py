from pydantic import BaseModel
from enum import Enum

class Unit(str, Enum):
    each = "each"
    grams = "g"
    kilograms = "kg"
    millilitres = "ml"
    litres = "l"

class PantryItemCreate(BaseModel):
    name: str
    quantity: int
    unit: Unit

class PantryItemUpdate(BaseModel):
    name: str
    quantity: int
    unit: Unit

class PantryItemResponse(BaseModel):
    id: int
    name: str
    quantity: int
    unit: Unit

    model_config = {
        "from_attributes": True
    }

class RecipeCreate(BaseModel):
    name: str
    base_servings: int

class RecipeUpdate(BaseModel):
    name: str
    base_servings: int

class RecipeResponse(BaseModel):
    id: int
    name: str
    base_servings: int

    model_config = {
        "from_attributes": True
    }

class RecipeIngredientCreate(BaseModel):
    name: str
    quantity_required: int
    unit: Unit


class RecipeIngredientResponse(BaseModel):
    id: int
    ingredient_id: int
    name: str
    quantity_required: int
    unit: Unit

    model_config = {
        "from_attributes": True
    }

class RecipeIngredientUpdate(BaseModel):
    name: str
    quantity_required: int
    unit: Unit

class RecipeDetailResponse(BaseModel):
    id: int
    name: str
    base_servings: int
    ingredients: list[RecipeIngredientAvailabilityResponse]

## Schema for pantry satifaction of specific recipe

class IngredientAvailabilityStatus(str, Enum):
    enough = "enough"
    insufficient = "insufficient"
    missing = "missing"
    incompatible = "incompatible"


class RecipeIngredientAvailabilityResponse(BaseModel):
    recipe_ingredient_id: int
    ingredient_id: int
    name: str
    base_servings: int

    quantity_required: int
    required_unit: Unit

    quantity_in_pantry: int
    pantry_unit: Unit | None

    status: IngredientAvailabilityStatus


class RecipeAvailabilityResponse(BaseModel):
    id: int
    name: str
    ingredients_available: int
    ingredients_required: int
    can_make: bool
    ingredients: list[RecipeIngredientAvailabilityResponse]