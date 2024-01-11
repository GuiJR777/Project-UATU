from rest_framework import serializers
from .models import Monitoring


class MonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monitoring
        fields = '__all__'
        read_only_fields = ['user', 'preco_atual', 'preco_anterior', 'created_at']
