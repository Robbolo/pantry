"""add base servings to recipe - fixed typo

Revision ID: 63f228574ead
Revises: bc651273fb09
Create Date: 2026-08-14 12:00:17.831880

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '63f228574ead'
down_revision: Union[str, Sequence[str], None] = 'bc651273fb09'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "recipes",
        "base_services",
        new_column_name="base_servings",
    )


def downgrade() -> None:
    op.alter_column(
        "recipes",
        "base_servings",
        new_column_name="base_services",
    )