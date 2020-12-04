from rest_framework import routers
from .api import AEDViewSet, AEDInspectionViewSet, AEDNotesViewSet
from .views import aed_generate_report_pdf_view
from django.urls import path

router = routers.DefaultRouter()
router.register('aed', AEDViewSet, 'aed')
router.register('aed_inspection', AEDInspectionViewSet, 'aed_inspection')
router.register('aed_notes', AEDNotesViewSet, 'aed_notes')

urlpatterns = [
    path('aed_report_pdf', aed_generate_report_pdf_view, name='aed_report_pdf'),
]

urlpatterns += router.urls