from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from monitoring.tasks import atualizar_preco


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
