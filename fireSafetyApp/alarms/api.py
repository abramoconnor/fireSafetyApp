from rest_framework import viewsets, permissions
from fire_extinguish.models import FireExtinguisher
from .serializers import FESerializer


class FEViewSet(viewsets.ModelViewSet):
    queryset = FireExtinguisher.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FESerializer