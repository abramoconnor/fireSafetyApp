from rest_framework import viewsets, permissions
from sprinklers.models import Sprinklers, SprinklerInspectionForm
from .serializers import SprinklersSerializer, SprinklerInspectionSerializer


class SprinklerViewSet(viewsets.ModelViewSet):
    queryset = Sprinklers.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SprinklersSerializer 

class SprinklerInspectionViewSet(viewsets.ModelViewSet):
    queryset = SprinklerInspectionForm.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SprinklerInspectionSerializer