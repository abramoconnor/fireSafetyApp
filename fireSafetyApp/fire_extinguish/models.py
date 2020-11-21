from django.db import models
from django.utils import timezone
from buildings.models import Building

class FireExtinguisher(models.Model):
    exnum = models.CharField(max_length=100, unique=True)
    last_monthly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_monthly_inspection = models.DateTimeField(default=timezone.now)
    last_annual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_annual_inspection = models.DateTimeField(default=timezone.now)
    last_6year_service = models.DateTimeField(default=timezone.now)
    upcoming_6year_service = models.DateTimeField(default=timezone.now)
    last_12year_test = models.DateTimeField(default=timezone.now)
    upcoming_12year_test = models.DateTimeField(default=timezone.now)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="buildings", default=0)

class FEInspection(models.Model):
    inspection_type = models.CharField(max_length=100)
    date_tested = models.DateTimeField(default=timezone.now)
    tester = models.CharField(max_length=100)
    fire_extinguisher = models.ForeignKey(FireExtinguisher, on_delete=models.CASCADE, related_name="fire_extinguish", default=0)