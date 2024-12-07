import os

from dotenv import load_dotenv

load_dotenv()

from typing import List

import crud
import models
import schemas
from database import engine, get_db
from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.orm import Session

app = FastAPI()

if os.environ.get("ENV") == "development":
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Hello VQE!"}

@app.get("/vehicles", response_model=List[schemas.Vehicle])
async def get_vehicles(db: Session = Depends(get_db)):
    return crud.get_vehicles(db)

@app.get("vehicles/bikes", response_model=List[schemas.Bike])
async def home(db: Session = Depends(get_db)):
    return crud.get_bikes(db)

@app.get("vehicles/cars", response_model=List[schemas.Car])
async def home(db: Session = Depends(get_db)):
    return crud.get_cars(db)

@app.get("vehicles/spaceships", response_model=List[schemas.Spaceship])
async def home(db: Session = Depends(get_db)):
    return crud.get_spaceships(db)