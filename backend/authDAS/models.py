from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    first_name= models.TextField()
    last_name=models.TextField()
    email=models.EmailField()
    password= models.TextField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'







    def __str__(self):
        return self.first_name