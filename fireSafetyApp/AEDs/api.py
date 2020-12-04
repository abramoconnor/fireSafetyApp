from rest_framework import viewsets, permissions
from AEDs.models import aed, AEDInspection, AEDNotes
from .serializers import AEDSerializer, AEDInspectionSerializer, AEDNotesSerializer


class AEDViewSet(viewsets.ModelViewSet):
    serializer_class = AEDSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = aed.objects.all()
        building = self.request.query_params.get('building', None)
        if building is not None:
            queryset = queryset.filter(building=building)
        return queryset

class AEDInspectionViewSet(viewsets.ModelViewSet):
    serializer_class = AEDInspectionSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = AEDInspection.objects.all()
        aed = self.request.query_params.get('aed', None)
        if aed is not None:
            queryset = queryset.filter(aed=aed)
        return queryset

class AEDNotesViewSet(viewsets.ModelViewSet):
    serializer_class = AEDNotesSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get_queryset(self):
        queryset = AEDNotes.objects.all()
        aed = self.request.query_params.get('aed', None)
        if aed is not None:
            queryset = queryset.filter(aed=aed)
        return queryset