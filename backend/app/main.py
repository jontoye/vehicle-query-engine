import os

from dotenv import load_dotenv

load_dotenv()

from typing import List

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import crud, models
from .database import engine, get_db
from .schemas import (
    BikeFilters,
    BikeResponse,
    CarFilters,
    CarResponse,
    FilterParams,
    SpaceshipFilters,
    SpaceshipResponse,
    VehicleResponse,
)

app = FastAPI()

origins = os.environ.get("ALLOW_ORIGINS", "").split(",")

app.add_middleware(CORSMiddleware, allow_origins=origins)

if os.environ.get("ENV") == "development":
    # models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Hello VQE!"}


@app.get("/vehicles", response_model=List[VehicleResponse])
async def get_vehicles(
    db: Session = Depends(get_db), filters: FilterParams = Depends()
):
    return crud.get_vehicles(db, **filters.model_dump())


@app.get("/vehicles/bikes", response_model=List[BikeResponse])
async def get_bikes(
    db: Session = Depends(get_db),
    filters: FilterParams = Depends(),
    bike_filters: BikeFilters = Depends(),
):
    return crud.get_bikes(db, **filters.model_dump(), bike_filters=bike_filters)


@app.get("/vehicles/bikes/{bike_id}", response_model=BikeResponse)
async def get_bike(bike_id: int, db: Session = Depends(get_db)):
    return crud.get_bike(db, bike_id)


@app.get("/vehicles/cars", response_model=List[CarResponse])
async def get_cars(
    db: Session = Depends(get_db),
    filters: FilterParams = Depends(),
    car_filters: CarFilters = Depends(),
):
    return crud.get_cars(db, **filters.model_dump(), car_filters=car_filters)


@app.get("/vehicles/cars/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, db: Session = Depends(get_db)):
    return crud.get_car(db, car_id)


@app.get("/vehicles/spaceships", response_model=List[SpaceshipResponse])
async def get_spaceships(
    db: Session = Depends(get_db),
    filters: FilterParams = Depends(),
    spaceship_filters: SpaceshipFilters = Depends(),
):
    return crud.get_spaceships(
        db, **filters.model_dump(), spaceship_filters=spaceship_filters
    )


@app.get("/vehicles/spaceships/{spaceship_id}", response_model=SpaceshipResponse)
async def get_spaceship(spaceship_id: int, db: Session = Depends(get_db)):
    return crud.get_spaceship(db, spaceship_id)


@app.get("/vehicles/{vehicle_id}", response_model=VehicleResponse)
async def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    return crud.get_vehicle(db, vehicle_id)
