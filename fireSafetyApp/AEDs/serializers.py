from rest_framework import serializers
from AEDs.models import AED

class AEDSerializer(serializers.ModelSerializer):
    class Meta:
        model = AED
        fields = '__all__'