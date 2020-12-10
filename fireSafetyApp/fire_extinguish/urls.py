from rest_framework import routers
from django.urls import path
from .api import FEViewSet, FEInspectionViewSet, FENotesViewSet
from .views import fe_generate_report_pdf_view

router = routers.DefaultRouter()
router.register('inspection', FEInspectionViewSet, 'fe_inspection')
router.register('notes', FENotesViewSet, 'fe_notes')
router.register('', FEViewSet, 'fire_extinguish')

urlpatterns = [
    path('pdf', fe_generate_report_pdf_view, name='fe_report_pdf'),
]

urlpatterns += router.urls