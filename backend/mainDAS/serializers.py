from mainDAS.models import *
from rest_framework import serializers


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = '__all__'



class UpdateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = ['fraud_account', 'confirming_station', 'details']


class ViewTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraudAlert
        fields = '__all__'