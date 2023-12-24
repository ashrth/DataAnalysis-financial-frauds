from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()


def custom_validate(data):
    email = data['email'].strip()
    password = data['password'].strip()
    

    if UserModel.objects.filter(email=email).exists():
        raise ValidationError('Email already exists')

    if not email:
        raise ValidationError('Please enter a valid Email address')

    if not password or len(password) < 9:
        raise ValidationError('Password must be at least 8 characters long')

    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Email is needed')
    return True


def validate_password(data):
    password = data['password'].strip()
    if len(password) < 8 or len(password) > 120:
        raise ValidationError('Length must be more than 8 characters')
    if not password:
        raise ValidationError('Password is needed')

    return True


