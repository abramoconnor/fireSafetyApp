from django.db import models
from django.utils import timezone
from buildings.models import Building

class aed(models.Model):
    location = models.CharField(max_length=100)
    last_monthly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_monthly_inspection = models.DateTimeField(default=timezone.now)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="buildingss", default=0)

class AEDInspection(models.Model):
    inspection_type = models.CharField(max_length=100)
    date_tested = models.DateTimeField(default=timezone.now)
    tester = models.CharField(max_length=100)
    aed = models.ForeignKey(aed, on_delete=models.CASCADE, related_name="aed", default=0)

class AEDNotes(models.Model):
    note = models.CharField(max_length=240)
    author = models.CharField(max_length=100)
    date_written = models.DateTimeField(default=timezone.now)
    aed = models.ForeignKey(aed, on_delete=models.CASCADE, related_name="AED", default=0)