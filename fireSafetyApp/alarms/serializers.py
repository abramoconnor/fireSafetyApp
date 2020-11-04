from rest_framework import serializers
from fire_extinguish.models import FireExtinguisher

class FESerializer(serializers.ModelSerializer):
    class Meta:
        model = FireExtinguisher
        fields = '__all__'