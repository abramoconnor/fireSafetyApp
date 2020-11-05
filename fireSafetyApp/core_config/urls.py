from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('buildings.urls')),
    path('', include('fire_extinguish.urls')),
    path('', include('AEDs.urls')),
    path('', include('accounts.urls'))
]
