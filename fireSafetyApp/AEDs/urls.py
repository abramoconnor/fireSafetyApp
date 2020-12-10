from rest_framework import routers
from .api import AEDViewSet, AEDInspectionViewSet, AEDNotesViewSet
from .views import aed_generate_report_pdf_view
from django.urls import path

router = routers.DefaultRouter()
router.register('inspection', AEDInspectionViewSet, 'aed_inspection')
router.register('notes', AEDNotesViewSet, 'aed_notes')
router.register('', AEDViewSet, 'aed')

urlpatterns = [
    path('pdf', aed_generate_report_pdf_view, name='aed_report_pdf'),
]

urlpatterns += router.urls