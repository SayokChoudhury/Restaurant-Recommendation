import os
import pandas as pd
from datasets import load_dataset
from database import engine, Base, Restaurant

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Cleans the raw Hugging Face dataframe and maps it to our standardized schema.
    """
    # Normalize column names for easier mapping
    df.columns = df.columns.str.lower().str.strip()
    
    # Map common Zomato variations to our standard names
    column_mapping = {
        'restaurant name': 'name',
        'rate': 'rating',
        'approx_cost(for two people)': 'cost',
        'average_cost_for_two': 'cost',
        'cuisines': 'cuisine',
        'city': 'location',
        'listed_in(city)': 'location'
    }
    
    # Rename matching columns
    df = df.rename(columns={k: v for k, v in column_mapping.items() if k in df.columns})
    
    # Remove any duplicated columns that result from renaming multiple source columns to the same target name
    df = df.loc[:, ~df.columns.duplicated()]
    
    # Ensure required columns exist
    required_columns = ['name', 'location', 'cuisine', 'cost', 'rating']
    for col in required_columns:
        if col not in df.columns:
            df[col] = None
            
    # Clean rating (e.g. '4.1/5' -> 4.1, 'NEW' or '-' -> NaN)
    if 'rating' in df.columns:
        df['rating'] = df['rating'].astype(str).str.split('/').str[0].replace(['NEW', '-'], None)
        df['rating'] = pd.to_numeric(df['rating'], errors='coerce')
        
    # Clean cost (e.g. '1,200' -> 1200)
    if 'cost' in df.columns:
        df['cost'] = df['cost'].astype(str).str.replace(',', '', regex=False)
        df['cost'] = pd.to_numeric(df['cost'], errors='coerce')
        
    # Drop rows without name
    df = df.dropna(subset=['name'])
    
    # Drop duplicates based on name and location
    df = df.drop_duplicates(subset=['name', 'location'], keep='first')
    
    # Return only the required columns
    return df[required_columns]

def run_ingestion():
    print("Setting up the database tables...")
    # Drop all tables first to ensure clean slate
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    print("Downloading Zomato dataset from Hugging Face...")
    try:
        # Load the dataset with streaming to avoid Out Of Memory errors on small instances
        dataset = load_dataset('ManikaSaini/zomato-restaurant-recommendation', split='train', streaming=True)
        # Take a subset of 20000 rows for the demo to save memory and time
        df = pd.DataFrame(list(dataset.take(20000)))
    except Exception as e:
        print(f"Error loading dataset: {e}")
        return
        
    print(f"Loaded {len(df)} rows. Cleaning data...")
    df_clean = clean_data(df)
    
    print(f"Saving {len(df_clean)} cleaned rows to SQLite database...")
    # Using pandas to_sql to insert rows, appending to the restaurants table
    df_clean.to_sql('restaurants', con=engine, if_exists='append', index=False)
    print("Data ingestion complete! The database is ready.")

if __name__ == "__main__":
    run_ingestion()
