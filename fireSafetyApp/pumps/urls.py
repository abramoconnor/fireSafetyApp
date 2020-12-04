from rest_framework import routers
from django.urls import path
from .api import PumpViewSet, PumpInspectionViewSet, PumpNotesViewSet
from .views import pump_report_pdf_view

router = routers.DefaultRouter()
router.register('fire_pump', PumpViewSet, 'fire_pump')
router.register('pump_insp', PumpInspectionViewSet, 'pump_insp')
router.register('pump_notes', PumpNotesViewSet, 'pump_notes')

urlpatterns = [
    path('pump_report_pdf', pump_report_pdf_view, name='pump_report_pdf'),
]

urlpatterns += router.urls