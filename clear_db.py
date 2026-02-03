from backend.database import SessionLocal, engine
from backend.models import Contact
from sqlalchemy import text

def clear_db():
    try:
        db = SessionLocal()
        num_deleted = db.query(Contact).delete()
        db.commit()
        print(f"Successfully deleted {num_deleted} contacts.")
        db.close()
    except Exception as e:
        print(f"Error clearing database: {e}")

if __name__ == "__main__":
    clear_db()
