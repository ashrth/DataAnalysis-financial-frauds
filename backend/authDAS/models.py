from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    first_name= models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email=models.EmailField(unique=True, max_length=30)
    password= models.CharField(max_length=70)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    







    def __str__(self):
        return self.first_name