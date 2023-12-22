from django.contrib.auth.models import User
from django.db import models
# from backend.DB import db

class User(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name= models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email=models.EmailField(unique=True, max_length=35)
    password= models.CharField(max_length=70)

    

    
    







    def __str__(self):
        return self.user.first_name