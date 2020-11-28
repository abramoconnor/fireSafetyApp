from rest_framework import serializers
from alarms.models import AlarmSystem, AlarmSystemInspection, AlarmSystemNotes

class AlarmSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmSystem
        fields = '__all__'


class AlarmSystemInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmSystemInspection
        fields = '__all__'

class AlarmSystemNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmSystemNotes
        fields = '__all__'