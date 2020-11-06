# Generated by Django 3.1.2 on 2020-11-06 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sprinklers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SprinklerInspectionForm',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('date_tested', models.DateTimeField(auto_now_add=True)),
                ('tester', models.CharField(max_length=100)),
                ('propulsion_test', models.CharField(max_length=100)),
            ],
        ),
    ]
