import pandas as pd
from datasets import load_dataset

dataset = load_dataset('ManikaSaini/zomato-restaurant-recommendation', split='train')
df = dataset.to_pandas()
df.columns = df.columns.str.lower().str.strip()
print("Original Columns:", df.columns.tolist())

column_mapping = {
    'restaurant name': 'name',
    'rate': 'rating',
    'approx_cost(for two people)': 'cost',
    'average_cost_for_two': 'cost',
    'cuisines': 'cuisine',
    'city': 'location',
    'listed_in(city)': 'location'
}

df = df.rename(columns={k: v for k, v in column_mapping.items() if k in df.columns})
print("Renamed Columns:", df.columns.tolist())

if 'rating' in df.columns and df['rating'].dtype == 'object':
    print("Rating before:", df['rating'].head().tolist())
    df['rating'] = df['rating'].astype(str).str.split('/').str[0].replace(['NEW', '-'], None)
    df['rating'] = pd.to_numeric(df['rating'], errors='coerce')
    print("Rating after:", df['rating'].head().tolist())
else:
    print("Condition failed. 'rating' in df:", 'rating' in df.columns, "dtype:", df['rating'].dtype if 'rating' in df.columns else None)
