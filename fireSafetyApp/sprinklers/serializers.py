from rest_framework import serializers
from sprinklers.models import Sprinklers, SprinklerInspectionForm

class SprinklersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprinklers
        fields = '__all__'

class SprinklerInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprinklerInspectionForm
        fields = '__all__'