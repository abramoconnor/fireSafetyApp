from rest_framework import routers
from django.urls import path
from .api import AlarmsViewSet, AlarmInspectionViewSet
from .views import alarm_inspection_render_pdf_view

router = routers.DefaultRouter()
router.register('alarms', AlarmsViewSet, 'alarms')
router.register('alarm_inspection', AlarmInspectionViewSet, 'alarm_inspection')

urlpatterns = [
    path('alarm_insp_pdf/<pk>', alarm_inspection_render_pdf_view, name='alarm_insp_pdf'),
]

urlpatterns += router.urls