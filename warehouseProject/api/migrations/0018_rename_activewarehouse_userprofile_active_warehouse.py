# Generated by Django 4.1.3 on 2023-02-28 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_alter_warehouse_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='activeWarehouse',
            new_name='active_warehouse',
        ),
    ]
