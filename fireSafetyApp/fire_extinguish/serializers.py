from rest_framework import serializers
from fire_extinguish.models import FireExtinguisher, FEInspection

class FESerializer(serializers.ModelSerializer):
    class Meta:
        model = FireExtinguisher
        fields = '__all__'

class FEInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FEInspection
        fields = '__all__'