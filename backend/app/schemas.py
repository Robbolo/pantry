from pydantic import BaseModel
from enum import Enum


class PantryItemCreate(BaseModel):
    name: str
    quantity: int

class PantryItemUpdate(BaseModel):
    name: str
    quantity: int

class PantryItemResponse(BaseModel):
    id: int
    name: str
    quantity: int

    model_config = {
        "from_attributes": True
    }

class RecipeCreate(BaseModel):
    name: str

class RecipeUpdate(BaseModel):
    name: str

class RecipeResponse(BaseModel):
    id: int
    name: str

    model_config = {
        "from_attributes": True
    }

class RecipeIngredientCreate(BaseModel):
    name: str
    quantity_required: int


class RecipeIngredientResponse(BaseModel):
    id: int
    ingredient_id: int
    name: str
    quantity_required: int

    model_config = {
        "from_attributes": True
    }

class RecipeIngredientUpdate(BaseModel):
    name: str
    quantity_required: int

class RecipeDetailResponse(BaseModel):
    id: int
    name: str
    ingredients: list[RecipeIngredientResponse]

## Schema for pantry satifaction of specific recipe

class IngredientAvailabilityStatus(str, Enum):
    enough = "enough"
    insufficient = "insufficient"
    missing = "missing"


class RecipeIngredientAvailabilityResponse(BaseModel):
    recipe_ingredient_id: int
    ingredient_id: int
    name: str
    quantity_required: int
    quantity_in_pantry: int
    status: IngredientAvailabilityStatus


class RecipeAvailabilityResponse(BaseModel):
    id: int
    name: str
    ingredients_available: int
    ingredients_required: int
    can_make: bool
    ingredients: list[RecipeIngredientAvailabilityResponse]