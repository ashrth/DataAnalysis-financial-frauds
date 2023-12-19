from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate


UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    first_name=serializers.CharField()
    last_name=serializers.CharField()
    email = serializers.Charfield()
    password = serializers.CharField()


    def create():
        pass
    

class LoginSerializers(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField()



class ViewSerializers(serializers.ModelSerializer):
    class Meta:
        model= UserModel
        exclude=['password']