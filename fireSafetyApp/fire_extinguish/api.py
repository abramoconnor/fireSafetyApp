from rest_framework import viewsets, permissions
from fire_extinguish.models import FireExtinguisher, FEInspection, FENotes
from .serializers import FESerializer, FEInspectionSerializer, FENotesSerializer


class FEViewSet(viewsets.ModelViewSet):
    serializer_class = FESerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = FireExtinguisher.objects.all()
        building = self.request.query_params.get('building', None)
        if building is not None:
            queryset = queryset.filter(building=building)
        return queryset
    
    

class FEInspectionViewSet(viewsets.ModelViewSet):
    serializer_class = FEInspectionSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = FEInspection.objects.all()
        fire_extinguisher = self.request.query_params.get('fire_extinguisher', None)
        if fire_extinguisher is not None:
            queryset = queryset.filter(fire_extinguisher=fire_extinguisher)
        return queryset

class FENotesViewSet(viewsets.ModelViewSet):
    serializer_class = FENotesSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = FENotes.objects.all()
        fire_extinguisher = self.request.query_params.get('fire_extinguisher', None)
        if fire_extinguisher is not None:
            queryset = queryset.filter(fire_extinguisher=fire_extinguisher)
        return queryset
