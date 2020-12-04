# Generated by Django 3.1.2 on 2020-12-04 02:37

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0002_auto_20201118_1353'),
        ('AEDs', '0002_aedinspectionform'),
    ]

    operations = [
        migrations.CreateModel(
            name='AEDInspection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inspection_type', models.CharField(max_length=100)),
                ('date_tested', models.DateTimeField(default=django.utils.timezone.now)),
                ('tester', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='AEDNotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(max_length=240)),
                ('author', models.CharField(max_length=100)),
                ('date_written', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.DeleteModel(
            name='AEDInspectionForm',
        ),
        migrations.RemoveField(
            model_name='aed',
            name='code',
        ),
        migrations.RemoveField(
            model_name='aed',
            name='last_inspection',
        ),
        migrations.RemoveField(
            model_name='aed',
            name='upcoming_inspection',
        ),
        migrations.AddField(
            model_name='aed',
            name='building',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='buildingss', to='buildings.building'),
        ),
        migrations.AddField(
            model_name='aed',
            name='last_monthly_inspection',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='aed',
            name='location',
            field=models.CharField(default='storage', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='aed',
            name='upcoming_monthly_inspection',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='aednotes',
            name='aed',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='AED', to='AEDs.aed'),
        ),
        migrations.AddField(
            model_name='aedinspection',
            name='aed',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='aed', to='AEDs.aed'),
        ),
    ]