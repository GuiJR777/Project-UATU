FROM python:3.9.18-slim-bullseye

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

RUN pip install gunicorn

COPY . /app
WORKDIR /app

EXPOSE 8000

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]