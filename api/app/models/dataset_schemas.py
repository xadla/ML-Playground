from pydantic import BaseModel

from typing import List, Optional


class Annotation(BaseModel):
	x: float
	y: float
	classID: str
	size: Optional[int] = None
	timestamp: Optional[str] = None


class Dataset(BaseModel):
	name: str
	createdAt: Optional[str] = None
	imageDimentions: Optional[dict] = None
	classes = List[dict]
	annotations = List[Annotation]
