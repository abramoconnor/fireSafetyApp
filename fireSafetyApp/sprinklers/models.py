from django.db import models

class Sprinklers(models.Model):
    code = models.CharField(max_length=100, unique=True)
    last_inspection = models.DateTimeField(auto_now_add=True)
    upcoming_inspection = models.DateTimeField(auto_now_add=True)

class SprinklerInspectionForm(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    date_tested = models.DateTimeField(auto_now_add=True)
    tester = models.CharField(max_length=100)
    propulsion_test = models.CharField(max_length=100)