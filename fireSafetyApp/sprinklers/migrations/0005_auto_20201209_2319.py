# Generated by Django 3.1.2 on 2020-12-10 05:19

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('sprinklers', '0004_sprinklersystem_coverage'),
    ]

    operations = [
        migrations.AddField(
            model_name='sprinklersystemnotes',
            name='author',
            field=models.CharField(default='me', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sprinklersystemnotes',
            name='date_written',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
