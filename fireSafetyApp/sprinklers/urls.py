from rest_framework import routers
from .api import SprinklerViewSet

router = routers.DefaultRouter()
router.register('sprinklers', SprinklerViewSet, 'sprinklers')

urlpatterns = router.urls