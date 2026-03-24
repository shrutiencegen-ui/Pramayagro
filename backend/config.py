import os

class Config:

    SECRET_KEY = "super-secret-key-Pramay"

    JWT_SECRET_KEY = "this-is-a-very-long-secret-key-for-jwt-authentication-12345"

    SQLALCHEMY_DATABASE_URI = "sqlite:///Pramay.db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False