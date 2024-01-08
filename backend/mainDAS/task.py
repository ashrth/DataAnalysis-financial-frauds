from celery import Celery
from django.core.management import call_command

app = Celery('your_django_app')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task
def process_real_time_transactions():
    call_command('bank_server')