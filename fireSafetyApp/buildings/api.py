from rest_framework import viewsets, permissions
from buildings.models import Building
from .serializers import BuildingSerializer


class BuildingViewSet(viewsets.ModelViewSet):
    queryset = Building.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BuildingSerializer