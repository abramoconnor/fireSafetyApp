from rest_framework import routers
from django.urls import path
from .api import AlarmSystemViewSet, AlarmSystemInspectionViewSet, AlarmSystemNotesViewSet
from .views import alarmsys_report_pdf_view

router = routers.DefaultRouter()
router.register('inspection', AlarmSystemInspectionViewSet, 'alarmsys_insp')
router.register('notes', AlarmSystemNotesViewSet, 'alarmsys_notes')
router.register('', AlarmSystemViewSet, 'alarmsystem')

urlpatterns = [
    path('pdf', alarmsys_report_pdf_view, name='alarmsys_report_pdf'),
]

urlpatterns += router.urls