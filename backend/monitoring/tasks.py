from celery import shared_task

from django.core.mail import send_mail
from django.conf import settings
import yfinance as yf


@shared_task
def atualizar_preco(monitoring_id):
    from .models import Monitoring
    monitoring = Monitoring.objects.get(id=monitoring_id)

    try:
        print(
            f"""
Atualizando o preço da ação {monitoring.codigo_acao}
usuário: {monitoring.user.username}
intervalo: {monitoring.intervalo_atualizacao / 60} minuto(s)
"""  # noqa
        )
        symbol = monitoring.codigo_acao + ".SA"
        data = yf.download(symbol)

        data['Preco_Anterior'] = data['Close'].shift(1)

        novo_preco = data['Close'].iloc[-1]
        preco_anterior = data['Preco_Anterior'].iloc[-1]

        monitoring.preco_anterior = preco_anterior
        monitoring.preco_atual = novo_preco
        monitoring.save()

        print(f"Preço da ação {symbol} atualizado para {novo_preco}")

        if monitoring.alerta_compra and float(novo_preco) <= float(monitoring.alerta_compra):
            print(f"Alerta de compra para a ação {symbol}")
            send_mail(
                f"Alerta de Compra - {monitoring.codigo_acao}",
                f"O preço da ação {monitoring.codigo_acao} atingiu o valor de compra: {monitoring.alerta_compra}",
                settings.DEFAULT_FROM_EMAIL,
                [monitoring.user.email],
                fail_silently=False,
            )

        if monitoring.alerta_venda and float(novo_preco) >= float(monitoring.alerta_venda):
            print(f"Alerta de venda para a ação {symbol}")
            send_mail(
                f"Alerta de Venda - {monitoring.codigo_acao}",
                f"O preço da ação {monitoring.codigo_acao} atingiu o valor de venda: {monitoring.alerta_venda}",
                settings.DEFAULT_FROM_EMAIL,
                [monitoring.user.email],
                fail_silently=False,
            )

    except Exception as e:
        print(f"Erro ao atualizar o preço da ação {symbol}: {e}")

    monitoring.save()
