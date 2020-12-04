from django.db import models
from django.utils import timezone
from buildings.models import Building

class FirePump(models.Model):
    last_monthly_inspection = models.DateTimeField(default=timezone.now)
    upcoming_monthly_inspection = models.DateTimeField(default=timezone.now)
    last_annual_inspection = models.DateTimeField(default=timezone.now)
    upcoming_annual_inspection = models.DateTimeField(default=timezone.now)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name="buildingsss", default=0)

class PumpInspection(models.Model):
    suction_pressure = models.CharField(max_length=100)
    discharge_pressure = models.CharField(max_length=100)
    run_time = models.CharField(max_length=100)
    inspection_type = models.CharField(max_length=100)
    date_tested = models.DateTimeField(default=timezone.now)
    tester = models.CharField(max_length=100)
    fire_pump = models.ForeignKey(FirePump, on_delete=models.CASCADE, related_name="pump", default=0)

class PumpNotes(models.Model):
    note = models.CharField(max_length=240)
    fire_pump = models.ForeignKey(FirePump, on_delete=models.CASCADE, related_name="fpump", default=0)