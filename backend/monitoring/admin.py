from django.contrib import admin
from .models import Monitoring


class MonitoringAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'codigo_acao',
        'preco_atual',
        'preco_anterior',
        'intervalo_atualizacao',
        'alerta_compra',
        'alerta_venda'
    )


admin.site.register(Monitoring, MonitoringAdmin)
