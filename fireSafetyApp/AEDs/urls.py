from rest_framework import routers
from .api import AEDViewSet, AEDInspectionViewSet
from .views import aed_inspection_render_pdf_view
from django.urls import path

router = routers.DefaultRouter()
router.register('AEDs', AEDViewSet, 'AEDs')
router.register('aed_inspection', AEDInspectionViewSet, 'aed_inspection')

urlpatterns = [
    path('aed_insp_pdf/<pk>', aed_inspection_render_pdf_view, name='aed_insp_pdf'),
]

urlpatterns += router.urls