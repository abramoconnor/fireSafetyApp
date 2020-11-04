from rest_framework import routers
from .api import AEDViewSet

router = routers.DefaultRouter()
router.register('AEDs', AEDViewSet, 'AEDs')

urlpatterns = router.urls