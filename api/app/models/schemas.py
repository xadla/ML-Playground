from pydantic import BaseModel

class TrainingRequest(BaseModel):
    dataset_id: str
    model_type: str
    hyperparameters: dict

class TrainingResult(BaseModel):
    accuracy: float
    loss: float
    job_id: str
