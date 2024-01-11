from django.db import models
from django.contrib.auth.models import User
from django_celery_beat.models import PeriodicTask
from django.db.models.signals import pre_delete
from django.dispatch import receiver


class Monitoring(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    codigo_acao = models.CharField(max_length=50)
    preco_atual = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    preco_anterior = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    intervalo_atualizacao = models.IntegerField()
    alerta_compra = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    alerta_venda = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    task = models.OneToOneField(
        PeriodicTask, null=True, blank=True, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'codigo_acao']


@receiver(pre_delete, sender=Monitoring)
def delete_task_on_monitoring_delete(sender, instance, **kwargs):
    if instance.task:
        instance.task.delete()
