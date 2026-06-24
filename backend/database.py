import os
import shutil
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Strategy: Use the pre-built restaurants.db bundled inside backend/data/.
# On Railway with Root Directory = backend, this becomes ./data/restaurants.db.
# SQLite needs a writable location, so on Railway we copy to /tmp.

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))

# The bundled seed database (inside the backend folder)
BUNDLED_DB = os.path.join(BACKEND_DIR, "data", "restaurants.db")

# Writable database location
if os.environ.get("RAILWAY_ENVIRONMENT") or os.environ.get("RAILWAY_SERVICE_NAME"):
    # On Railway, the repo filesystem may be read-only; /tmp is always writable
    WRITABLE_DB_DIR = "/tmp/data"
else:
    # Locally, use the same directory as the bundled DB
    WRITABLE_DB_DIR = os.path.join(BACKEND_DIR, "data")

os.makedirs(WRITABLE_DB_DIR, exist_ok=True)
WRITABLE_DB = os.path.join(WRITABLE_DB_DIR, "restaurants.db")

# If the writable DB doesn't exist yet, copy the bundled one
if not os.path.exists(WRITABLE_DB) and os.path.exists(BUNDLED_DB):
    print(f"Copying bundled database to writable location: {WRITABLE_DB}")
    shutil.copy2(BUNDLED_DB, WRITABLE_DB)
elif os.path.exists(WRITABLE_DB):
    print(f"Using existing database at: {WRITABLE_DB}")
else:
    print(f"WARNING: No bundled database found at {BUNDLED_DB}. Starting with empty database.")

DATABASE_URL = f"sqlite:///{WRITABLE_DB}"

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Restaurant(Base):
    """
    SQLAlchemy model for the Restaurant table.
    Stores the cleaned Zomato dataset.
    """
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, index=True, nullable=False)
    location = Column(String, index=True)
    cuisine = Column(String, index=True)
    cost = Column(Float)
    rating = Column(Float)
