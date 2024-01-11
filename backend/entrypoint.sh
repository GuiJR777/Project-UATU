#!/bin/sh

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input

mkdir -p /var/www/backend/static/

gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 4