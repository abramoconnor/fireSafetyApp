# Generated by Django 3.1.2 on 2020-12-02 06:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0020_delete_building'),
    ]

    operations = [
        migrations.AddField(
            model_name='fenotes',
            name='author',
            field=models.CharField(default='chance', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fenotes',
            name='date_written',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
