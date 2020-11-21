# Generated by Django 3.1.2 on 2020-11-19 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0013_auto_20201118_2358'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fireextinguisher',
            name='number',
        ),
        migrations.AddField(
            model_name='fireextinguisher',
            name='exnum',
            field=models.CharField(default=0, max_length=100, unique=True),
            preserve_default=False,
        ),
    ]
