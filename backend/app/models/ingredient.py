from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Ingredient(Base):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        unique=True,
    )

    unit: Mapped[str] = mapped_column(
    String(50),
    nullable=False,
    )

    pantry_items = relationship(
        "PantryItem",
        back_populates="ingredient",
    )

    recipe_ingredients = relationship(
    "RecipeIngredient",
    back_populates="ingredient",
    )

