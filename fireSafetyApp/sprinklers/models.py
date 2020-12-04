from django.db import models
from django.utils import timezone
from buildings.models import Building

class SprinklerSystem(models.Model):
    system_type = models.CharField(max_length=100)
    coverage = models.CharField(max_length=100)
    last_weekly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_weekly_inspection = models.DateTimeField(default=timezone.now)
    last_monthly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_monthly_inspection = models.DateTimeField(default=timezone.now)
    last_quarterly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_quarterly_inspection = models.DateTimeField(default=timezone.now)
    last_semiannual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_semiannual_inspection = models.DateTimeField(default=timezone.now)
    last_annual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_annual_inspection = models.DateTimeField(default=timezone.now)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="buildingS", default=0)

class SprinklerSystemInspection(models.Model):
    air_pressure = models.CharField(max_length=25)
    water_pressure = models.CharField(max_length=25)
    inspection_type = models.CharField(max_length=100)
    date_tested = models.DateTimeField(default=timezone.now)
    tester = models.CharField(max_length=100)
    sprinkler_system = models.ForeignKey(SprinklerSystem, on_delete=models.CASCADE, related_name="sprinkler_sys", default=0)

class SprinklerSystemNotes(models.Model):
    note = models.CharField(max_length=240)
    sprinkler_system = models.ForeignKey(SprinklerSystem, on_delete=models.CASCADE, related_name="sprinkler_system", default=0)