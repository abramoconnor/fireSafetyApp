from rest_framework import routers
from django.urls import path
from .api import FEViewSet, FEInspectionViewSet, FENotesViewSet
from .views import fe_generate_report_pdf_view

router = routers.DefaultRouter()
router.register('fire_extinguish', FEViewSet, 'fire_extinguish')
router.register('fe_inspection', FEInspectionViewSet, 'fe_inspection')
router.register('fe_notes', FENotesViewSet, 'fe_notes')

urlpatterns = [
    path('fe_report_pdf', fe_generate_report_pdf_view, name='fe_report_pdf'),
]

urlpatterns += router.urls