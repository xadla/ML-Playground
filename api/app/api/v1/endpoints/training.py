from fastapi import APIRouter
from app.models.schemas import TrainingRequest
from app.tasks.training import train_model

router = APIRouter()

@router.post("/train")
async def start_training(request: TrainingRequest):
    task = train_model.delay(request.dataset_id, request.hyperparameters)
    return {"task_id": task.id}
