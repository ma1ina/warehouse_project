# Generated by Django 4.1.3 on 2023-02-21 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_item_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(default='Other', max_length=200),
        ),
    ]