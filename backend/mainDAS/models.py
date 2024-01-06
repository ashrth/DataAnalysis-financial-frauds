from django.db import models

class FlaggedAccount(models.Model):
    account_number=models.BigIntegerField(unique=True)
    available_credit = models.BigIntegerField()
    date_flagged = models.DateTimeField(auto_now_add=True)
    amount = models.BigIntegerField()
    KYC_incomplete = models.BooleanField()
    multiple_accounts = models.BooleanField()
    transaction_category = models.CharField(max_length= 100)


    
    

class FraudAlert(models.Model):
    fraud_account = models.CharField(max_length=50)
    confirming_station =  models.CharField(max_length=50)
    details = models.TextField()
    status = models.CharField(max_length=10, default='Open')
    timestamp = models.DateTimeField(auto_now_add=True)