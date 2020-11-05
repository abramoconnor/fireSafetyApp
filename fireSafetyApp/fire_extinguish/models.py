from django.db import models

class FireExtinguisher(models.Model):
    code = models.CharField(max_length=100, unique=True)
    last_inspection = models.DateTimeField(auto_now_add=True)
    upcoming_inspection = models.DateTimeField(auto_now_add=True)

class FEInspectionForm(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_tested = models.DateTimeField(auto_now_add=True)
    tester = models.CharField(max_length=100)
    ionization_test = models.CharField(max_length=100)
    heat_detector_test = models.CharField(max_length=100)
    manual_pull_station_test = models.CharField(max_length=100)
    lamp_test = models.CharField(max_length=100)