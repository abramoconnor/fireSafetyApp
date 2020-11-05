from rest_framework import routers
from .api import FEViewSet

router = routers.DefaultRouter()
router.register('fire_extinguish', FEViewSet, 'fire_extinguish')

urlpatterns = router.urls