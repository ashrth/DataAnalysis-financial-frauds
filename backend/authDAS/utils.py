import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
load_dotenv()
from rest_framework_simplejwt.tokens import RefreshToken


# def generate_tokens(user):
#     payload = {
#         'id': user.id,
#         'exp': datetime.utcnow()+timedelta(days=1, minutes=0),
#         'iat': datetime.utcnow()
#     }
    
#     access_token = jwt.encode(payload, os.environ.get('JWT_SECRET_KEY'), algorithm='HS256')
#     return access_token



def generate_tokens(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }