#!/bin/sh

gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 4 &

celery -A backend worker --loglevel=info --concurrency 1 -E &

celery -A backend beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler --max-interval 10