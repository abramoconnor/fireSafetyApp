from rest_framework import serializers
from alarms.models import Alarms, AlarmInspectionForm

class AlarmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarms
        fields = '__all__'


class AlarmInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmInspectionForm
        fields = '__all__'