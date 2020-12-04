from rest_framework import viewsets, permissions
from pumps.models import FirePump, PumpInspection, PumpNotes
from .serializers import PumpSerializer, PumpInspectionSerializer, PumpNotesSerializer


class PumpViewSet(viewsets.ModelViewSet):
    serializer_class = PumpSerializer 
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = FirePump.objects.all()
        building = self.request.query_params.get('building', None)
        if building is not None:
            queryset = queryset.filter(building=building)
        return queryset

class PumpInspectionViewSet(viewsets.ModelViewSet):
    serializer_class = PumpInspectionSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = PumpInspection.objects.all()
        fire_pump = self.request.query_params.get('fire_pump', None)
        if fire_pump is not None:
            queryset = queryset.filter(fire_pump=fire_pump)
        return queryset

class PumpNotesViewSet(viewsets.ModelViewSet):
    serializer_class = PumpNotesSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = PumpNotes.objects.all()
        fire_pump = self.request.query_params.get('fire_pump', None)
        if fire_pump is not None:
            queryset = queryset.filter(fire_pump=fire_pump)
        return queryset