import os
from datetime import timedelta

class Config:

    SECRET_KEY = "super-secret-key-Pramay"

    # JWT settings
    JWT_SECRET_KEY = "this-is-a-very-long-secret-key-for-jwt-authentication-12345"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)        # access token valid for 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)       # refresh token valid for 7 days

    # Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///Pramay.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False