from django.db import models

class FlaggedAccount(models.Model):
    account_number=models.BigIntegerField()
    pan_number=models.CharField(max_length=50, unique=True)
    flag_reason = models.CharField(max_length=200)
    date_flagged = models.DateTimeField(auto_now_add=True)
    
    ''''''

class FraudAlert(models.Model):
    fraud_account = models.CharField(max_length=50)
    confirming_station =  models.CharField(max_length=50)
    details = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)