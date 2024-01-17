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
                details=clean_data['details'],
                status=clean_data['status'])
            fraud_alert_obj.save()
            return fraud_alert_obj


class UpdateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = ['fraud_account', 'confirming_station', 'details', 'status']


class ViewTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = '__all__'


class FlaggedAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlaggedAccount
        fields = '__all__'


class BroadcastMessageSerializer(serializers.Serializer):
    content = serializers.CharField()