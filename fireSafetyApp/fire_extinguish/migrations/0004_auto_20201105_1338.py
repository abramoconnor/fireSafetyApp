# Generated by Django 3.1.2 on 2020-11-05 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0003_auto_20201105_1319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feinspectionform',
            name='id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
