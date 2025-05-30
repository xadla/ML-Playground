from celery import Celery

from .config import settings

app = Celery(
    "ml_tasks",
    broker=settings.CELERY_BROKER_URL,
    include=["app.tasks.training"]
)

# Configure additional settings
app.conf.task_track_started = True
