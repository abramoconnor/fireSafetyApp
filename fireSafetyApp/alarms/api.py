from rest_framework import viewsets, permissions
from alarms.models import AlarmSystem, AlarmSystemInspection, AlarmSystemNotes
from .serializers import AlarmSystemSerializer, AlarmSystemInspectionSerializer, AlarmSystemNotesSerializer


class AlarmSystemViewSet(viewsets.ModelViewSet):
    serializer_class = AlarmSystemSerializer 
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = AlarmSystem.objects.all()
        building = self.request.query_params.get('building', None)
        if building is not None:
            queryset = queryset.filter(building=building)
        return queryset

class AlarmSystemInspectionViewSet(viewsets.ModelViewSet):
    serializer_class = AlarmSystemInspectionSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = AlarmSystemInspection.objects.all()
        alarm_system = self.request.query_params.get('alarm_system', None)
        if alarm_system is not None:
            queryset = queryset.filter(alarm_system=alarm_system)
        return queryset

class AlarmSystemNotesViewSet(viewsets.ModelViewSet):
    serializer_class = AlarmSystemNotesSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = AlarmSystemNotes.objects.all()
        alarm_system = self.request.query_params.get('alarm_system', None)
        if alarm_system is not None:
            queryset = queryset.filter(alarm_system=alarm_system)
        return queryset