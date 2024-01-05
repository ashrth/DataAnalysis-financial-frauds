from mainDAS.models import *
from rest_framework import serializers


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = '__all__'

        def create(self, clean_data):
            fraud_alert_obj = FraudAlert.objects.create(
                fraud_account=clean_data['fraud_account'],
                confirming_station=clean_data['confirming_station'],
                details=clean_data['details'])
            fraud_alert_obj.save()
            return fraud_alert_obj



class UpdateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = ['fraud_account', 'confirming_station', 'details']


class ViewTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = '__all__'