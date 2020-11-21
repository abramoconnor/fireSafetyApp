# Generated by Django 3.1.2 on 2020-11-21 03:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fire_extinguish', '0014_auto_20201119_1646'),
    ]

    operations = [
        migrations.CreateModel(
            name='FEInspection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inspection_type', models.CharField(max_length=100)),
                ('date_tested', models.DateTimeField(auto_now_add=True)),
                ('tester', models.CharField(max_length=100)),
                ('fire_extinguisher', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='fire_extinguish', to='fire_extinguish.fireextinguisher')),
            ],
        ),
        migrations.DeleteModel(
            name='FEInspectionForm',
        ),
    ]
