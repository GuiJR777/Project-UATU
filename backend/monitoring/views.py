import json

from django.db import transaction
from django_celery_beat.models import IntervalSchedule, PeriodicTask
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Monitoring
from .serializers import MonitoringSerializer
from .tasks import atualizar_preco


class MonitoringListCreateView(generics.ListCreateAPIView):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            with transaction.atomic():
                serializer.save(user=self.request.user)
                instance = serializer.instance

                instance.preco_atual = 0.0
                instance.preco_anterior = 0.0

                schedule, created = IntervalSchedule.objects.get_or_create(
                    every=instance.intervalo_atualizacao,
                    period=IntervalSchedule.SECONDS,
                )

                task = PeriodicTask.objects.create(
                    interval=schedule,
                    name=f"Monitor: {instance.user.username}_{instance.codigo_acao}",
                    task="monitoring.tasks.atualizar_preco",
                    kwargs=json.dumps(
                        {
                            "monitoring_id": instance.id,
                        }
                    ),
                )
                instance.task = task
                instance.save()
                atualizar_preco(instance.id)

        except Exception as e:
            print(f"Erro ao criar o monitoramento: {e}")


class MonitoringDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.instance

        if instance.task:
            instance.task.delete()

        schedule, created = IntervalSchedule.objects.get_or_create(
            every=instance.intervalo_atualizacao,
            period=IntervalSchedule.SECONDS,
        )

        task = PeriodicTask.objects.create(
            interval=schedule,
            name=f"Monitor: {instance.user.username}_{instance.codigo_acao}",
            task="monitoring.tasks.atualizar_preco",
            kwargs=json.dumps(
                {
                    "monitoring_id": instance.id,
                }
            ),
        )

        instance.task = task
        serializer.save()


class MonitoringListView(generics.ListCreateAPIView):
    queryset = Monitoring.objects.all()
    serializer_class = MonitoringSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Monitoring.objects.filter(user=self.request.user)

