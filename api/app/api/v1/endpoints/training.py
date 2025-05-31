from fastapi import APIRouter, HTTPException

from celery.result import AsyncResult

from app.tasks import linear_regression
from app.models.dataset_schemas import Dataset

router = APIRouter()

@router.post("/train/linear-regression")
async def train_linear_regression(dataset: Dataset):
    """Endpoint to start linear regression training"""
    try:
        dataset_dict = dataset.dict()
        task = linear_regression.delay(dataset_dict)
        return {"task_id": task.id}
    except Exception as e:
        raise HTTPException(get_status=400, detail=str(e))


@router.get("/train/status/{task_id}")
async def get_status(task_id: str):
    """Check training status"""
    task_result = AsyncResult(task_id)
    
    if task_result.state == 'FAILURE':
        return {
            "status": "failed",
            "error": str(task_result.info)
        }
    
    return {
        "status": task_result.state,
        "progress": task_result.info.get('progress', 0),
        "current_status": task_result.info.get('status', '')
    }
