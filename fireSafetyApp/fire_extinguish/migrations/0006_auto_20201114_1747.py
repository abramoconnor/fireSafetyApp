# Generated by Django 3.1.2 on 2020-11-14 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0005_auto_20201114_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fireextinguisher',
            name='upcoming_inspection',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
