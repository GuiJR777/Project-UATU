from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            '_id',
            'username',
            'email',
            'first_name',
            'last_name',
            'fullname',
            'is_admin',
        ]

    def get_fullname(self, obj):
        fullname = obj.first_name + " " + obj.last_name

        if fullname == " ":
            fullname = obj.email

        return fullname

    def get__id(self, obj):
        return obj.id

    def get_is_admin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            '_id',
            'username',
            'email',
            'first_name',
            'last_name',
            'fullname',
            'is_admin',
            'token',
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)

        return str(token.access_token)
