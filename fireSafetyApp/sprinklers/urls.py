from rest_framework import routers
from .api import SprinklerViewSet, SprinklerInspectionViewSet
from django.urls import path
from .views import sprinkler_inspection_render_pdf_view

router = routers.DefaultRouter()
router.register('sprinklers', SprinklerViewSet, 'sprinklers')
router.register('sprinkler_inspection', SprinklerInspectionViewSet, 'sprinkler_inspection')

urlpatterns = [
    path('sprinkler_insp_pdf/<pk>', sprinkler_inspection_render_pdf_view, name='sprinkler_insp_pdf'),
]

urlpatterns += router.urls