import os
import shutil
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Strategy: Use the pre-built restaurants.db bundled in the repo.
# On Railway, the repo is cloned to /app, so the DB lives at /app/data/restaurants.db.
# SQLite needs a writable location, so we copy the bundled DB to a writable path if needed.

# Determine paths
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

# The bundled (read-only on some platforms) seed database
BUNDLED_DB = os.path.join(PROJECT_ROOT, "data", "restaurants.db")

# Writable database location
# On Railway, /tmp is always writable
if os.environ.get("RAILWAY_ENVIRONMENT") or os.environ.get("RAILWAY_SERVICE_NAME"):
    WRITABLE_DB_DIR = "/tmp/data"
else:
    WRITABLE_DB_DIR = os.path.join(PROJECT_ROOT, "data")

os.makedirs(WRITABLE_DB_DIR, exist_ok=True)
WRITABLE_DB = os.path.join(WRITABLE_DB_DIR, "restaurants.db")

# If the writable DB doesn't exist yet, copy the bundled one
if not os.path.exists(WRITABLE_DB) and os.path.exists(BUNDLED_DB):
    print(f"Copying bundled database to writable location: {WRITABLE_DB}")
    shutil.copy2(BUNDLED_DB, WRITABLE_DB)
elif not os.path.exists(WRITABLE_DB):
    print("WARNING: No bundled database found. Starting with empty database.")

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
