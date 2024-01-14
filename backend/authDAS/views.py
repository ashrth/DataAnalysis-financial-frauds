from .validation import custom_validate, validate_password, validate_email
from rest_framework.views import APIView
from django.contrib.auth import login
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import generate_tokens
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer
from rest_framework import status
from dotenv import load_dotenv
load_dotenv()
# Create your views here.

# {
# "email":"ash@gmail.com",
# "password":"ash123456"
# { "email":"testuser@gmail.com","password":"ash123456"}
# {"first_name":"test", "last_name":"user1", "email":"testuser1@gmail.com","password":"ash123456"}
# }
# {"email":"testuser2@gmail.com","password":"ash123456"}

# {"account_number": "1234567895600", "available_credit": 643.97, 
# "amount": 280.85, "transaction_category": "electronic", 
# "day": 19, "time": "01:42:32", "payment_failed": "False", 
# "forget_password": "False", 
# "KYC_incomplete": "True", "multiple_accounts": 2}


class RegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):

        clean_data = custom_validate(data=request.data)

        serializer = RegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                access_token = generate_tokens(user)
                data = {'token': access_token}
                response = Response(data, status=status.HTTP_201_CREATED)
                return response

        return Response({'message': 'Something went wrong while registering'}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)

            print(request.user)
            print(request.user.is_anonymous)
            print(request.user.is_authenticated)
            if user.is_active:
                access_token = generate_tokens(user)
                response = Response()
                response.data = {
                    'token': access_token,
                    'message': 'Login successful'
                }
                return response

        return Response({
            'status': 400,
            'message': 'Login failed'
        })


class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Blacklist the refresh token, effectively logging out the user
            refresh_token = request.data.get('token')
            print(refresh_token)
            RefreshToken(refresh_token).blacklist()

            return Response({'message': 'Logged out successfully.'})
        except Exception as e:
            return Response({'error': f'Error logging out: {str(e)}'}, status=500)


class UserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        


