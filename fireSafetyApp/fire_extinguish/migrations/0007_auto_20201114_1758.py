# Generated by Django 3.1.2 on 2020-11-14 23:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0006_auto_20201114_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fireextinguisher',
            name='upcoming_inspection',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]