from rest_framework import routers
from .api import SprinklerSystemViewSet, SprinklerSystemInspectionViewSet, SprinklerSystemNotesViewSet
from django.urls import path
from .views import sprinklersys_report_pdf_view

router = routers.DefaultRouter()
router.register('sprinkler_system', SprinklerSystemViewSet, 'sprinkler_system')
router.register('sprinklersys_insp', SprinklerSystemInspectionViewSet, 'sprinklersys_insp')
router.register('sprinklersys_notes', SprinklerSystemNotesViewSet, 'sprinklersys_notes')

urlpatterns = [
    path('sprinkler_report_pdf', sprinklersys_report_pdf_view, name='sprinkler_report_pdf'),
]

urlpatterns += router.urls