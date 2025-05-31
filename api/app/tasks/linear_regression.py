from app.core.celery import app
from app.models.schemas import TrainingResult


@app.task(bind=True)
def linear_regression(self, dataset):
	pass
