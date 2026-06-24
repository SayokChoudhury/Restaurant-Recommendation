import os
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Set up SQLite database in the 'data' directory at the project root
parent_dir = os.path.dirname(os.path.dirname(__file__))
# If running on Railway, parent_dir resolves to "/", which causes permission errors.
if parent_dir == "/" or parent_dir == "\\":
    DB_DIR = "/app/data"
else:
    DB_DIR = os.path.join(parent_dir, "data")
    
os.makedirs(DB_DIR, exist_ok=True)

DATABASE_URL = f"sqlite:///{os.path.join(DB_DIR, 'restaurants.db')}"

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
