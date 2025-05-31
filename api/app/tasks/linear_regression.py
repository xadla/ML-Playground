from app.core.celery import app
from app.models.schemas import TrainingResult

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

import pandas as pd
import numpy as np

@app.task(bind=True)
def linear_regression(self, dataset: dict):
    """Celery task for training a linear regression model with progress updates."""
    
    try:
        # Update progress - loading data (10%)
        self.update_state(state='PROGRESS', meta={'progress': 10, 'status': 'Loading data'})
        
        # Convert dataset to DataFrame
        annotations = dataset["annotations"]
        X = [[a["x"]] for a in annotations]
        y = [a["y"] for a in annotations]
        
        # Update progress - splitting data (30%)
        self.update_state(state='PROGRESS', meta={'progress': 30, 'status': 'Splitting data'})
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Update progress - training model (50%)
        self.update_state(state='PROGRESS', meta={'progress': 50, 'status': 'Training model'})
        
        # Train model
        model = LinearRegression()
        model.fit(X_train, y_train)
        
        # Update progress - evaluating model (80%)
        self.update_state(state='PROGRESS', meta={'progress': 80, 'status': 'Evaluating model'})
        
        # Evaluate
        score = model.score(X_test, y_test)
        predictions = model.predict(X_test)
        
        # Return results
        return TrainingResult(
            accuracy=score,
            coefficients=list(model.coef_),
            intercept=float(model.intercept_),
            predictions=predictions.tolist(),
            job_id=self.request.id
        ).dict()
        
    except Exception as e:
        self.update_state(state='FAILURE', meta={'error': str(e)})
        raise
