import sqlite3
import pandas as pd

conn = sqlite3.connect("d:/Restaurant Recommendation/data/restaurants.db")
df = pd.read_sql("SELECT * FROM restaurants LIMIT 5", conn)
print(df.to_dict(orient="records"))
print("Types:")
print(df.dtypes)
