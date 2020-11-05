from rest_framework import serializers
from fire_extinguish.models import FireExtinguisher, FEInspectionForm

class FESerializer(serializers.ModelSerializer):
    class Meta:
        model = FireExtinguisher
        fields = '__all__'

class FEInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FEInspectionForm
        fields = '__all__'