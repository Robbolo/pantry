from pydantic import BaseModel


class IngredientCreate(BaseModel):
    name: str
    quantity: int


class IngredientResponse(BaseModel):
    id: int
    name: str
    quantity: int

    model_config = {
        "from_attributes": True
    }