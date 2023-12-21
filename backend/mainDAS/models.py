from django.db import models

class FlaggedAccount(models.Model):
    account_number=models.BigIntegerField()
    pan_number=models.CharField(max_length=50, unique=True)
    flag_reason = models.CharField(max_length=200)
    date_flagged = models.DateTimeField(auto_now_add=True)
    ''''''

