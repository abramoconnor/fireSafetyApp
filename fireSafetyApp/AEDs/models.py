from django.db import models

class AED(models.Model):
    code = models.CharField(max_length=100, unique=True)
    last_inspection = models.DateTimeField(auto_now_add=True)
    upcoming_inspection = models.DateTimeField(auto_now_add=True)

class AEDInspectionForm(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_tested = models.DateTimeField(auto_now_add=True)
    tester = models.CharField(max_length=100)
    voltage_test = models.CharField(max_length=100)