# Generated by Django 3.1.2 on 2020-12-10 05:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('alarms', '0004_auto_20201128_1625'),
    ]

    operations = [
        migrations.AddField(
            model_name='alarmsystemnotes',
            name='author',
            field=models.CharField(default='hi', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='alarmsystemnotes',
            name='date_written',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
