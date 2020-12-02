from rest_framework import viewsets, permissions
from sprinklers.models import SprinklerSystem, SprinklerSystemInspection, SprinklerSystemNotes
from .serializers import SprinklerSystemSerializer, SprinklerSystemInspectionSerializer, SprinklerSystemNotesSerializer


class SprinklerSystemViewSet(viewsets.ModelViewSet):
    serializer_class = SprinklerSystemSerializer 
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = SprinklerSystem.objects.all()
        building = self.request.query_params.get('building', None)
        if building is not None:
            queryset = queryset.filter(building=building)
        return queryset

class SprinklerSystemInspectionViewSet(viewsets.ModelViewSet):
    serializer_class = SprinklerSystemInspectionSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = SprinklerSystemInspection.objects.all()
        sprinkler_system = self.request.query_params.get('sprinkler_system', None)
        if sprinkler_system is not None:
            queryset = queryset.filter(sprinkler_system=sprinkler_system)
        return queryset

class SprinklerSystemNotesViewSet(viewsets.ModelViewSet):
    serializer_class = SprinklerSystemNotesSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = SprinklerSystemNotes.objects.all()
        sprinkler_system = self.request.query_params.get('sprinkler_system', None)
        if sprinkler_system is not None:
            queryset = queryset.filter(sprinkler_system=sprinkler_system)
        return queryset