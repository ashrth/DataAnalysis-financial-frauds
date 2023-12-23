from rest_framework import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['first_name', 'last_name', 'email', 'password']

    def create(self, clean_data):
        user_obj = UserModel.objects.create(
            first_name=clean_data['first_name'],
            last_name=clean_data['last_name'],
            email=clean_data['email'],

        )
        user_obj.set_password(clean_data['password'])
        user_obj.save()
        return user_obj


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = UserModel
        fields = ['email', 'password']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ['password']
