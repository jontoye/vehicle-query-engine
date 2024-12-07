import models
import schemas
from enums import VehicleType, BikeType
from sqlalchemy import select
from sqlalchemy.orm import Session


def get_vehicles(db: Session):
    return db.query(models.Vehicle).all()

def get_bikes(db: Session):
    return db.query(models.Bike).all()

def get_cars(db: Session):
    return db.query(models.Car).all()

def get_spaceships(db: Session):
    return db.query(models.Spaceship).all()

def create_bike(db: Session, bike: schemas.BikeCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=schemas.VehicleCreate(
            model=bike.model, year=bike.year, vehicle_type=VehicleType.BIKE
        ),
    )
    bike_data = models.Bike(
        vehicle_id=vehicle.id,
        brand=bike.brand,
        gears=bike.gears,
        type=bike.type,
        wheel_size=bike.wheel_size,
    )
    db.add(bike_data)
    db.commit()
    db.refresh(bike_data)
    return bike_data

def create_car(db: Session, car: schemas.CarCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=schemas.VehicleCreate(
            model=car.model, year=car.year, vehicle_type=VehicleType.CAR
        ),
    )
    car_data = models.Car(
        vehicle_id=vehicle.id,
        colour=car.colour,
        engine_size=car.engine_size,
        horsepower=car.horsepower,
        make=car.make,
        seats=car.seats,
        top_speed=car.top_speed,
    )
    db.add(car_data)
    db.commit()
    db.refresh(car_data)
    return car_data

def create_spaceship(db: Session, spaceship: schemas.SpaceshipCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=schemas.VehicleCreate(
            model=spaceship.model,
            year=spaceship.year,
            vehicle_type=VehicleType.SPACESHIP,
        ),
    )
    spaceship_data = models.Spaceship(
        vehicle_id=vehicle.id,
        manufacturer=spaceship.manufacturer,
        max_crew=spaceship.max_crew,
        top_speed=spaceship.top_speed,
    )
    db.add(spaceship_data)
    db.commit()
    db.refresh(spaceship_data)
    return spaceship_data

def _create_vehicle(db: Session, vehicle: schemas.VehicleCreate):
    vehicle_data = models.Vehicle(
        model=vehicle.model, year=vehicle.year, vehicle_type=vehicle.vehicle_type
    )
    db.add(vehicle_data)
    db.flush()
    return vehicle_data
