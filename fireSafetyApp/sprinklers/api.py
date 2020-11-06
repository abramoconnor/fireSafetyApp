from rest_framework import viewsets, permissions
from sprinklers.models import Sprinklers
from .serializers import SprinklersSerializer


class SprinklerViewSet(viewsets.ModelViewSet):
    queryset = Sprinklers.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SprinklersSerializer 