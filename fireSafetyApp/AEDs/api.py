from rest_framework import viewsets, permissions
from AEDs.models import AED
from .serializers import AEDSerializer


class AEDViewSet(viewsets.ModelViewSet):
    queryset = AED.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AEDSerializer