import pandas as pd
import sqlite3
import os

# -------------------------------
# FILE PATHS
# -------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "data", "cleaned_data.csv")
DB_PATH = os.path.join(BASE_DIR, "db", "database.db")

# -------------------------------
# LOAD CLEANED DATA
# -------------------------------
def load_csv():
    try:
        df = pd.read_csv(DATA_PATH)

        # Remove unwanted columns
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

        # Standardize column names (VERY IMPORTANT)
        df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_").str.replace("-", "_")

        print("📌 Available columns:", df.columns.tolist())

        # Drop index column if exists
        if 'index' in df.columns:
            df = df.drop(columns=['index'])

        # Rename columns to match DB schema
        df = df.rename(columns={
            "amount": "total_amount",
            "qty": "quantity",
            "ship_state": "customer_location"
        })

        # Select only required columns
        required_columns = [
            "order_id",
            "date",
            "category",
            "quantity",
            "total_amount",
            "customer_location"
        ]

        # Check missing columns
        for col in required_columns:
            if col not in df.columns:
                raise Exception(f"Missing column: {col}")

        df = df[required_columns]

        # Add missing fields for DB schema
        df["product"] = "Unknown"
        df["price"] = df["total_amount"] / df["quantity"]

        print("✅ CSV loaded successfully")
        print("📌 Final columns:", df.columns.tolist())

        return df

    except Exception as e:
        print("❌ Error loading CSV:", e)
        return None

# -------------------------------
# CREATE DATABASE CONNECTION
# -------------------------------
def create_connection():
    conn = sqlite3.connect(DB_PATH)
    print("✅ Connected to SQLite database")
    return conn

# -------------------------------
# CREATE TABLE
# -------------------------------
def create_table(conn):
    query = """
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT,
        date TEXT,
        product TEXT,
        category TEXT,
        price REAL,
        quantity INTEGER,
        total_amount REAL,
        customer_location TEXT
    );
    """
    conn.execute(query)
    conn.commit()
    print("✅ Table 'sales' created")

# -------------------------------
# INSERT DATA
# -------------------------------
def insert_data(df, conn):
    try:
        df.to_sql("sales", conn, if_exists="append", index=False)
        print("✅ Data inserted successfully")
    except Exception as e:
        print("❌ Error inserting data:", e)

# -------------------------------
# MAIN FUNCTION
# -------------------------------
def main():
    df = load_csv()
    
    if df is None:
        return
    
    conn = create_connection()
    
    create_table(conn)
    
    insert_data(df, conn)
    
    conn.close()
    print("🎉 Database setup complete!")

# -------------------------------
# RUN SCRIPT
# -------------------------------
if __name__ == "__main__":
    main()