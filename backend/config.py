import os
from datetime import timedelta

class Config:
    # ---------------- SECRET KEYS ----------------
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key-Pramay")
    JWT_SECRET_KEY = os.environ.get(
        "JWT_SECRET_KEY",
        "this-is-a-very-long-secret-key-for-jwt-authentication-12345"
    )
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)

    # ---------------- DATABASE ----------------
    # Render environment variable DATABASE_URL वापरतो, नाही तर fallback SQLite
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///Pramay.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ---------------- BASE URL ----------------
    BASE_URL = os.environ.get("BASE_URL", "http://localhost:5000")

    # ---------------- UPLOAD FOLDER ----------------
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')