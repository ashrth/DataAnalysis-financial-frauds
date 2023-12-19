from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate


UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj= UserModel.objects.create(
            first_name= clean_data['first_name'],
            last_name=clean_data['last_name'] ,
            email=clean_data['email'],
            
        )
        user_obj.set_password(clean_data['password'])
        user_obj.save()
        return user_obj
        


class LoginSerializers(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class ViewSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ['password']
