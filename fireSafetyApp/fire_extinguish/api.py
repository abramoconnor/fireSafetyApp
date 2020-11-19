from rest_framework import viewsets, permissions
from fire_extinguish.models import FireExtinguisher, FEInspectionForm
from .serializers import FESerializer, FEInspectionSerializer


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
    queryset = FEInspectionForm.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FEInspectionSerializer