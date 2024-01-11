import schedule
import time
import threading
from .models import Monitoring

agendamento_thread = None
should_stop = False


def agendar_tarefas():
    for monitoring in Monitoring.objects.all():
        print(f"Agendando atualização para {monitoring.id}")
        monitoring.agendar_atualizacao()


def thread_agendamento():
    while not should_stop:
        schedule.run_pending()
        time.sleep(30)


def start():
    print("Start Jobs")
    global agendamento_thread, should_stop
    agendar_tarefas()
    agendamento_thread = threading.Thread(target=thread_agendamento)
    should_stop = False
    agendamento_thread.start()


def stop():
    print("Stopping jobs")
    global agendamento_thread, should_stop
    should_stop = True
    agendamento_thread.join(0.1)
    schedule.clear()
    agendamento_thread = None


def restart():
    print("Restarting jobs")
    stop()
    time.sleep(5)
    start()
