from datetime import date

from sqlalchemy import Integer, ForeignKey, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class MealPrep(Base):
    __tablename__ = "meal_preps"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    recipe_id: Mapped[int] = mapped_column(
        ForeignKey("recipes.id"),
        nullable=False,
    )

    prep_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    servings_made: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    recipe = relationship(
        "Recipe",
        back_populates="meal_preps",
    )
    user = relationship(
        "User",
        back_populates="meal_preps",
    )