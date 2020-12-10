from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('buildings/', include('buildings.urls')),
    path('fe/', include('fire_extinguish.urls')),
    path('aed/', include('AEDs.urls')),
    path('ss/', include('sprinklers.urls')),
    path('alarm/', include('alarms.urls')),
    path('pump/', include('pumps.urls')),
    path('auth/', include('accounts.urls')),
    path('', include('frontend.urls')),
]
