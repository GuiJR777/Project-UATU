FROM python:3.9-alpine

WORKDIR /app/backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir gunicorn

COPY . .

EXPOSE 8000

COPY ./entrypoint.sh /app/entrypoint.sh
ENTRYPOINT ["sh", "/app/entrypoint.sh"]