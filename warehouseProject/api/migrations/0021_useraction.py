# Generated by Django 4.1.3 on 2023-03-06 18:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0020_remove_warehouse_users'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=200)),
                ('item_id', models.IntegerField(default=0)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'UserActions',
            },
        ),
    ]
