"""add project comments

Revision ID: c21b41e7a08d
Revises: d137cd377a1e
Create Date: 2025-10-24 21:02:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "c21b41e7a08d"
down_revision: Union[str, Sequence[str], None] = "d137cd377a1e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "comments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("edited", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("timezone('utc', now())"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("timezone('utc', now())"),
            nullable=False,
        ),
        sa.Column("project_id", sa.Integer(), nullable=False),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["project_id"],
            ["projects.id"],
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["author_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
    )

    op.create_index(
        "ix_comments_project_created_at",
        "comments",
        ["project_id", "created_at"],
    )
    op.create_index(
        "ix_comments_author_created_at",
        "comments",
        ["author_id", "created_at"],
    )

    op.alter_column("comments", "edited", server_default=None)
    op.alter_column("comments", "created_at", server_default=None)
    op.alter_column("comments", "updated_at", server_default=None)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index("ix_comments_author_created_at", table_name="comments")
    op.drop_index("ix_comments_project_created_at", table_name="comments")
    op.drop_table("comments")
