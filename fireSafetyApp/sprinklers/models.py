from django.db import models

class Sprinklers(models.Model):
    code = models.CharField(max_length=100, unique=True)
    last_inspection = models.DateTimeField(auto_now_add=True)
    upcoming_inspection = models.DateTimeField(auto_now_add=True)