from rest_framework import routers
from django.urls import path
from .api import FEViewSet
from .views import fe_inspection_render_pdf_view

router = routers.DefaultRouter()
router.register('fire_extinguish', FEViewSet, 'fire_extinguish')

urlpatterns = [
    path('fe_insp_pdf/<pk>', fe_inspection_render_pdf_view, name='fe_insp_pdf'),
]

urlpatterns += router.urls