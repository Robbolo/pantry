from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="recipes",
    )

    recipe_ingredients = relationship(
    "RecipeIngredient",
    back_populates="recipe",
    cascade="all, delete-orphan",
)