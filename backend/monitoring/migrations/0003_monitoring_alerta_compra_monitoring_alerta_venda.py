# Generated by Django 5.0 on 2024-01-08 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0002_alter_monitoring_preco_anterior_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='monitoring',
            name='alerta_compra',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='monitoring',
            name='alerta_venda',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
