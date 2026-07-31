from collections.abc import Generator

from sqlalchemy.orm import Session

from app.database import SessionLocal

DEV_USER_ID = 1

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def get_current_user_id() -> int:
    return DEV_USER_ID