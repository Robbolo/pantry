from datetime import date

from sqlalchemy import Integer, ForeignKey, Date, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class MealAllocation(Base):
    __tablename__ = "meal_allocations"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    meal_prep_id: Mapped[int] = mapped_column(
        ForeignKey("meal_preps.id"),
        nullable=False,
    )

    meal_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    meal_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    servings: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    user = relationship(
    "User",
    back_populates="meal_allocations",
)

    meal_prep = relationship(
    "MealPrep",
    back_populates="meal_allocations",
)