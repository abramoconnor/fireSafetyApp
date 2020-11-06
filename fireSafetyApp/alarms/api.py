from rest_framework import viewsets, permissions
from alarms.models import Alarms, AlarmInspectionForm
from .serializers import AlarmsSerializer, AlarmInspectionSerializer


class AlarmsViewSet(viewsets.ModelViewSet):
    queryset = Alarms.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AlarmsSerializer 

class AlarmInspectionViewSet(viewsets.ModelViewSet):
    queryset = AlarmInspectionForm.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AlarmInspectionSerializer