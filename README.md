# Django Stock Price Monitoring
Project create for technical test of Innoa

## How to build

You have to give the Docker installed in your machine, clone this project, configure a .env file with the needed variables and run
```shell
docker-compose up --build
```

## Needed variables

- DEBUG
- CELERY_BROKER_URL
- CELERY_RESULT_BACKEND
- DEFAULT_FROM_EMAIL
- EMAIL_HOST
- EMAIL_PORT
- EMAIL_USE_TLS
- EMAIL_HOST_USER
- EMAIL_HOST_PASSWORD