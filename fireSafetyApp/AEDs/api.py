from rest_framework import viewsets, permissions
from AEDs.models import AED, AEDInspectionForm
from .serializers import AEDSerializer, AEDInspectionSerializer


class AEDViewSet(viewsets.ModelViewSet):
    queryset = AED.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AEDSerializer

class AEDInspectionViewSet(viewsets.ModelViewSet):
    queryset = AEDInspectionForm.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AEDInspectionSerializer