from django.db import models
from django.utils import timezone
from buildings.models import Building

class AlarmSystem(models.Model):
    last_monthly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_monthly_inspection = models.DateTimeField(default=timezone.now)
    last_semiannual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_semiannual_inspection = models.DateTimeField(default=timezone.now)
    last_annual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_annual_inspection = models.DateTimeField(default=timezone.now)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="building", default=0)

class AlarmSystemInspection(models.Model):
    inspection_type = models.CharField(max_length=100)
    date_tested = models.DateTimeField(default=timezone.now)
    tester = models.CharField(max_length=100)
    alarm_system = models.ForeignKey(AlarmSystem, on_delete=models.CASCADE, related_name="alarm_sys", default=0)

class AlarmSystemNotes(models.Model):
    note = models.CharField(max_length=240)
    author = models.CharField(max_length=100)
    date_written = models.DateTimeField(default=timezone.now)
    alarm_system = models.ForeignKey(AlarmSystem, on_delete=models.CASCADE, related_name="alarm_system", default=0)