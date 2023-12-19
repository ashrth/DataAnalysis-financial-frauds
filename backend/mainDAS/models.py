from django.db import models

class FraudAccount(models.Model):
    username = models.CharField(max_length=30)
    email = models.EmailField()
    accountId = models.CharField(max_length=10, unique=True)
    mobileNo = models.CharField(max_length=10)
    fraud_summary = models.TextField()
    flagged = models.BooleanField(default=False)

# Create your models here.
