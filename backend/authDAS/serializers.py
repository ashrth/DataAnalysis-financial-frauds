from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model, authenticate


UserModel = get_user_model()
print("here is the user model", UserModel)


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
        print('here is the details', user_obj)
        return user_obj


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = UserModel
        fields = ['email', 'password']

    def check_user(self, clean_data):
        user = authenticate(
            email=clean_data['email'], password=clean_data['password'])
        print("from seriali", user)
        if not user:
            raise ValidationError('User not found')
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        exclude = ['password']
