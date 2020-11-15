from rest_framework import serializers
from AEDs.models import AED, AEDInspectionForm

class AEDSerializer(serializers.ModelSerializer):
    class Meta:
        model = AED
        fields = '__all__'
    
class AEDInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AEDInspectionForm
        fields = '__all__'