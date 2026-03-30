import os
import sqlite3
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "db", "database.db")

# -----------------------------------
# DATABASE CONNECTION
# -----------------------------------
def get_connection():
    return sqlite3.connect(DB_PATH)

def load_data(query: str) -> pd.DataFrame:
    conn = get_connection()
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df


# -----------------------------------
# 1. TOTAL REVENUE
# -----------------------------------
def get_total_revenue():
    query = "SELECT SUM(quantity * price) as total_revenue FROM sales"
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    conn.close()
    
    total = result[0] if result and result[0] else 0
    return {"total_revenue": float(total)}


# -----------------------------------
# 2. MONTHLY SALES
# -----------------------------------
def get_monthly_sales():
    query = """
        SELECT strftime('%Y-%m', date) as month, SUM(quantity * price) as revenue 
        FROM sales 
        WHERE date IS NOT NULL AND date != ''
        GROUP BY month 
        ORDER BY month
    """
    df = load_data(query)
    if df.empty:
        return []
        
    return df.to_dict(orient="records")


# -----------------------------------
# 3. TOP PRODUCTS
# -----------------------------------
def get_top_products(limit=5):
    query = f"""
        SELECT product, SUM(quantity * price) as revenue 
        FROM sales 
        GROUP BY product 
        ORDER BY revenue DESC 
        LIMIT {limit}
    """
    df = load_data(query)
    if df.empty:
        return []
    return df.to_dict(orient="records")


# -----------------------------------
# 4. TOP CUSTOMERS
# -----------------------------------
def get_top_customers(limit=5):
    query = f"""
        SELECT customer_location as customer_name, SUM(quantity * price) as revenue 
        FROM sales 
        GROUP BY customer_location 
        ORDER BY revenue DESC 
        LIMIT {limit}
    """
    df = load_data(query)
    if df.empty:
        return []
    return df.to_dict(orient="records")