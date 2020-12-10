from rest_framework import routers
from django.urls import path
from .api import PumpViewSet, PumpInspectionViewSet, PumpNotesViewSet
from .views import pump_report_pdf_view

router = routers.DefaultRouter()
router.register('inspection', PumpInspectionViewSet, 'pump_insp')
router.register('notes', PumpNotesViewSet, 'pump_notes')
router.register('', PumpViewSet, 'fire_pump')

urlpatterns = [
    path('pdf', pump_report_pdf_view, name='pump_report_pdf'),
]

urlpatterns += router.urls