import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key-Pramay")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "default-jwt-key")
    
    # --- DATABASE CONFIG ---
    # Render cha DATABASE_URL ghenyasathi logic
    database_url = os.environ.get("DATABASE_URL", "sqlite:///Pramay.db")
    
    CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")
    # SQLAlchemy sathi 'postgres://' la 'postgresql://' madhe badla
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
        
    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
    BASE_URL = os.environ.get("BASE_URL", "http://localhost:5000")