# Generated by Django 4.1.3 on 2023-02-28 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_userprofile_assigned_warehouses'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='warehouse',
            name='users',
        ),
    ]