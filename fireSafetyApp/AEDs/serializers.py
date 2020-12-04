from rest_framework import serializers
from AEDs.models import aed, AEDInspection, AEDNotes

class AEDSerializer(serializers.ModelSerializer):
    class Meta:
        model = aed
        fields = '__all__'
    
class AEDInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AEDInspection
        fields = '__all__'

class AEDNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AEDNotes
        fields = '__all__'