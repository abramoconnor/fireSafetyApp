# Generated by Django 3.1.2 on 2020-11-18 20:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0002_auto_20201118_1353'),
        ('fire_extinguish', '0008_delete_building'),
    ]

    operations = [
        migrations.AddField(
            model_name='fireextinguisher',
            name='building',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='biuldings', to='buildings.building'),
        ),
    ]