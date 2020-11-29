from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('buildings.urls')),
    path('', include('fire_extinguish.urls')),
    path('', include('AEDs.urls')),
    path('', include('sprinklers.urls')),
    path('', include('alarms.urls')),
    path('', include('accounts.urls')),
    # re_path(r'.*', include('frontend.urls')) # catch all to go back to home page 
]
