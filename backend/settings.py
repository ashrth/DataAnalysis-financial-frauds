from decouple import config
import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


def Config():
    SECRET_KEY= os.getenv('SECRET_KEY', 'secret')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///dev.db")
    DEBUG = True

    return SECRET_KEY, SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, DEBUG
