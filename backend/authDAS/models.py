from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser
# from backend.DB import db


class User(AbstractUser):
    username = None
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=35)
    password = models.CharField(max_length=70)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    

    def __str__(self):
        return self.first_name
