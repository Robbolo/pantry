from sqlalchemy import ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"
    __table_args__ = (
        UniqueConstraint(
            "recipe_id",
            "ingredient_id",
            name="uq_recipe_ingredient",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    recipe_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("recipes.id"),
        nullable=False,
    )

    ingredient_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredients.id"),
        nullable=False,
    )

    quantity_required: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    recipe = relationship(
        "Recipe",
        back_populates="recipe_ingredients",
    )

    ingredient = relationship(
        "Ingredient",
        back_populates="recipe_ingredients",
    )