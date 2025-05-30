from app.core.celery import app
from app.models.schemas import TrainingResult

@app.task(bind=True)
def train_model(self, dataset_id: str, config: dict):
    self.update_state(state='PROGRESS', meta={'progress': 10})
    # Your training logic here
    return TrainingResult(accuracy=0.95, loss=0.1, job_id=self.request.id)
