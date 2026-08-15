from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
    )

    pantry_items = relationship(
        "PantryItem",
        back_populates="user",
    )

    recipes = relationship(
        "Recipe",
        back_populates="user",
    )

    meal_preps = relationship(
        "MealPrep",
        back_populates="user",
    )