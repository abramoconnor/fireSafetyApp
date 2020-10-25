from rest_framework import routers
from .api import BuildingViewSet

router = routers.DefaultRouter()
router.register('buildings', BuildingViewSet, 'buildings')

urlpatterns = router.urls