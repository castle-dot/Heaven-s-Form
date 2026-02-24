from rest_framework import serializers
from .models import Soul, Confession
from django.contrib.auth.models import User

class SoulSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soul
        fields = ['id','name', 'created_at']

class ConfessionSerializer(serializers.ModelSerializer):
    soul = SoulSerializer(read_only=True)
    class Meta:
        model = Confession
        fields = ['id', 'soul', 'content', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user