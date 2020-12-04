from rest_framework import serializers
from pumps.models import FirePump, PumpInspection, PumpNotes

class PumpSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirePump
        fields = '__all__'


class PumpInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PumpInspection
        fields = '__all__'

class PumpNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PumpNotes
        fields = '__all__'