from rest_framework import serializers
from fire_extinguish.models import FireExtinguisher, FEInspection, FENotes

class FESerializer(serializers.ModelSerializer):
    class Meta:
        model = FireExtinguisher
        fields = '__all__'

class FEInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FEInspection
        fields = '__all__'

class FENotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FENotes
        fields = '__all__'