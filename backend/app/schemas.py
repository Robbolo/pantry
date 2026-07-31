from pydantic import BaseModel


class IngredientCreate(BaseModel):
    name: str
    quantity: int

class IngredientUpdate(BaseModel):
    name: str
    quantity: int

class IngredientResponse(BaseModel):
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