from flask import Blueprint, jsonify
import sqlite3
import pandas as pd

# Import analytics functions ✅
from services.analytics import (
    get_total_revenue,
    get_monthly_sales,
    get_top_products,
    get_top_customers
)

api_bp = Blueprint('api', __name__)

DATABASE = "database.db"


# -----------------------------
# Database Connection (ONLY for /sales)
# -----------------------------
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


# -----------------------------
# Home Route
# -----------------------------
@api_bp.route('/', methods=['GET'])
def home():
    return {"message": "API is running 🚀"}


# -----------------------------
# GET /sales (raw data)
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
# GET /revenue (from analytics)
# -----------------------------
@api_bp.route('/revenue', methods=['GET'])
def revenue():
    try:
        return jsonify(get_total_revenue())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /monthly-sales
# -----------------------------
@api_bp.route('/monthly-sales', methods=['GET'])
def monthly_sales():
    try:
        return jsonify(get_monthly_sales())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /top-products
# -----------------------------
@api_bp.route('/top-products', methods=['GET'])
def top_products():
    try:
        return jsonify(get_top_products())
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# GET /top-customers
# -----------------------------
@api_bp.route('/top-customers', methods=['GET'])
def top_customers():
    try:
        return jsonify(get_top_customers())
    except Exception as e:
        return jsonify({"error": str(e)}), 500