from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes

from django.middleware.csrf import get_token

from .serializers import UserSerializer, UserRegisterSerializer, UserTokenSerializer
from .models import User
from .auth_handler import CookieJWTAuthentication


@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf_token(request):
    return Response({"csrfToken": get_token(request)}, status=status.HTTP_200_OK)


class UserLogoutAPI(APIView):

    permission_classes = [AllowAny]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        if request.user.is_authenticated:
            response = Response({"message": "Success"}, status=status.HTTP_200_OK)
            response.delete_cookie("access_token")
            response.delete_cookie("refresh_token")
            return response
        else:
            response = Response({"message": "Failed"}, status=status.HTTP_200_OK)
            return response


class UserRegisterAPI(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()  # Create and save user
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserTokenSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

        user = serializer.validated_data["user"]
        refresh = RefreshToken.for_user(user)

        response = Response({
            "message": "Login Successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name
            }
        }, status=status.HTTP_200_OK)

        response.set_cookie(
            key="access_token",
            value=str(refresh.access_token),
            httponly=True,
            secure=False,  # False for localhost, True in production
            samesite='Lax',  # 'None' if you need cross-site
            max_age=24 * 3600  # 1 day to match your token lifetime
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=7 * 24 * 3600  # 7 days
        )

        return response


class CheckUserAPI(APIView):

    permission_classes = [AllowAny]
    authentication_classes = [CookieJWTAuthentication]

    def get(self, request):
        user = request.user
        if user and user.is_authenticated:
            return Response({
                "isAuthenticated": "true",
                "user": {
                    "ID": user.id,
                    "name": user.name,
                    "email": user.email,
                    "created": user.created,
                }
            }, status=status.HTTP_200_OK)
        return Response({
            "isAuthenticated": "false",
        }, status=status.HTTP_200_OK)


class CheckEmail(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        email = request.query_params.get('email')
        if not email:
            return Response({"error": "email not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        exists = User.objects.filter(email=email).exists()
        return Response({"available": not exists})
