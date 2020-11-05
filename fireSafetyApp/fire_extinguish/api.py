from rest_framework import viewsets, permissions
from fire_extinguish.models import FireExtinguisher, FEInspectionForm
from .serializers import FESerializer, FEInspectionSerializer


class FEViewSet(viewsets.ModelViewSet):
    queryset = FireExtinguisher.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FESerializer

class FEInspectionViewSet(viewsets.ModelViewSet):
    queryset = FEInspectionForm.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FEInspectionSerializer