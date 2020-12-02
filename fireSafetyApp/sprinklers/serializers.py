from rest_framework import serializers
from sprinklers.models import SprinklerSystem, SprinklerSystemInspection, SprinklerSystemNotes

class SprinklerSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprinklerSystem
        fields = '__all__'


class SprinklerSystemInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprinklerSystemInspection
        fields = '__all__'

class SprinklerSystemNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SprinklerSystemNotes
        fields = '__all__'