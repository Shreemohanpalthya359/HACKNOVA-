from flask import Blueprint, jsonify
import sqlite3
import pandas as pd

api_bp = Blueprint('api', __name__)

DATABASE = "database.db"


# -----------------------------
# Database Connection
# -----------------------------
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# -----------------------------
# Optional Home Route (helps testing)
# -----------------------------
@api_bp.route('/', methods=['GET'])
def home():
    return {"message": "API is running 🚀"}


# -----------------------------
# GET /sales
# -----------------------------
@api_bp.route('/sales', methods=['GET'])
def get_sales():
    try:
        conn = get_db_connection()
        df = pd.read_sql_query("SELECT * FROM sales", conn)
        conn.close()
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /revenue
# -----------------------------
@api_bp.route('/revenue', methods=['GET'])
def get_revenue():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT SUM(price * quantity) AS total_revenue FROM sales")
        result = cursor.fetchone()
        conn.close()

        return jsonify({
            "total_revenue": result["total_revenue"] if result["total_revenue"] else 0
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /top-products
# -----------------------------
@api_bp.route('/top-products', methods=['GET'])
def get_top_products():
    try:
        conn = get_db_connection()
        query = """
        SELECT product, SUM(quantity) AS total_sold
        FROM sales
        GROUP BY product
        ORDER BY total_sold DESC
        LIMIT 5
        """
        df = pd.read_sql_query(query, conn)
        conn.close()
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /customers
# -----------------------------
@api_bp.route('/customers', methods=['GET'])
def get_customers():
    try:
        conn = get_db_connection()
        query = "SELECT DISTINCT customer_name FROM sales"
        df = pd.read_sql_query(query, conn)
        conn.close()
        return jsonify(df.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500