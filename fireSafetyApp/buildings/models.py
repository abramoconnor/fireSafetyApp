from django.db import models

class Building(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=100, unique=True)
    last_inspection = models.DateTimeField(auto_now_add=True)