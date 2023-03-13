# Generated by Django 4.1.3 on 2023-03-06 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_salelog_delete_saleslog_useraction_sale'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraction',
            name='sale',
        ),
        migrations.AddField(
            model_name='useraction',
            name='item',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.item'),
        ),
        migrations.AddField(
            model_name='useraction',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True),
        ),
        migrations.AddField(
            model_name='useraction',
            name='quantity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='SaleLog',
        ),
    ]