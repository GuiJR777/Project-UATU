from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    data = request.data
    name = data.get("name").split(" ")

    try:
        user = User.objects.create(
            first_name=name[0],
            last_name=" ".join(name[1:]),
            username=data.get("email"),
            email=data.get("email"),
            password=make_password(data.get("password")),
        )
        serializer = UserSerializerWithToken(user, many=False)

        return Response(serializer.data)

    except Exception:
        message = {
            "detail": "Email already registered"
        }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    try:
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except Exception:
        message = {
            "detail": "User not found"
        }
        return Response(message, status=status.HTTP_404_NOT_FOUND)
