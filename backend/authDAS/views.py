from .validation import custom_validate, validate_password, validate_email
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .utils import generate_tokens
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer
from rest_framework import status
import jwt
import os
from django.contrib.auth import get_user_model
from dotenv import load_dotenv
load_dotenv()
# Create your views here.

class RegisterView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):

        clean_data = custom_validate(data=request.data)

        serializer = RegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                access_token = generate_tokens(user)
                data = {'token': access_token}
                response = Response(data, status=status.HTTP_201_CREATED)
                response.set_cookie(
                    key='token', value=access_token, httponly=True)
                return response

        return Response({'message': 'Something went wrong while registering'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)

            if user.is_active:
                access_token = generate_tokens(user)
                response = Response()
                response.set_cookie(
                    key='token', value=access_token, httponly=True)
                response.data = {
                    'token': access_token
                }
                return response

        return Response({
            'status': 400,
            'message': 'Login failed'
        })


class LogoutView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_token = request.COOKIES.get('token')

        if user_token:
            response = Response()
            response.delete_cookie('token')
            response.data = {
                'message': "Logged out successfully."
            }
            return response
        response = Response()
        response.data = {
            'message': "User is already logged out"
        }

        return response


class UserView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('token')
        if not user_token:
            raise AuthenticationFailed('Unauthenticated user.')

        payload = jwt.decode(
            user_token, os.environ.get('JWT_SECRET_KEY'), algorithms=['HS256'])
        UserModel = get_user_model()
        user = UserModel.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
