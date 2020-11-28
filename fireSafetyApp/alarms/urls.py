from rest_framework import routers
from django.urls import path
from .api import AlarmSystemViewSet, AlarmSystemInspectionViewSet, AlarmSystemNotesViewSet
from .views import alarmsys_report_pdf_view

router = routers.DefaultRouter()
router.register('alarm_system', AlarmSystemViewSet, 'alarmsystem')
router.register('alarmsys_insp', AlarmSystemInspectionViewSet, 'alarmsys_insp')
router.register('alarmsys_notes', AlarmSystemNotesViewSet, 'alarmsys_notes')

urlpatterns = [
    path('alarmsys_report_pdf', alarmsys_report_pdf_view, name='alarmsys_report_pdf'),
]

urlpatterns += router.urls