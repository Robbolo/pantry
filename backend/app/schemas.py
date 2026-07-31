from pydantic import BaseModel


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