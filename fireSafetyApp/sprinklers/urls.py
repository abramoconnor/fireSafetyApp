from rest_framework import routers
from .api import SprinklerSystemViewSet, SprinklerSystemInspectionViewSet, SprinklerSystemNotesViewSet
from django.urls import path
from .views import sprinklersys_report_pdf_view

router = routers.DefaultRouter()
router.register('inspection', SprinklerSystemInspectionViewSet, 'sprinklersys_insp')
router.register('notes', SprinklerSystemNotesViewSet, 'sprinklersys_notes')
router.register('', SprinklerSystemViewSet, 'sprinkler_system')

urlpatterns = [
    path('pdf', sprinklersys_report_pdf_view, name='sprinkler_report_pdf'),
]

urlpatterns += router.urls