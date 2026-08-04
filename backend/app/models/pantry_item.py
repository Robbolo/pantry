from sqlalchemy import ForeignKey, UniqueConstraint, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PantryItem(Base):
    __tablename__ = "pantry_items"
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "ingredient_id",
            name="uq_pantry_user_ingredient",
        ),
    )

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
    )

    user_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    ingredient_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("ingredients.id"),
        nullable=False,
    )

    quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    unit: Mapped[str] = mapped_column(
    String(50),
    nullable=False,
    )

    ingredient = relationship(
        "Ingredient",
        back_populates="pantry_items",
    )
    user = relationship(
        "User",
        back_populates="pantry_items",
    )

