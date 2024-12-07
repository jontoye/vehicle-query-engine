import models
from enums import VehicleType
from fastapi import HTTPException
from helpers import (
    apply_sort_order,
    apply_vehicle_type_filters,
    apply_year_filter,
    get_sort_column,
)
from schemas import (
    BikeCreate,
    BikeFilters,
    CarCreate,
    CarFilters,
    SpaceshipCreate,
    SpaceshipFilters,
    VehicleBase,
    VehicleCreate,
)
from sqlalchemy import asc, desc
from sqlalchemy.orm import Query, Session, joinedload


def get_vehicles(
    db: Session,
    offset: int = 0,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "asc",
    year: int = None,
    year_gte: int = None,
    year_lte: int = None,
):
    query = db.query(models.Vehicle)

    query = apply_year_filter(query, year, year_gte, year_lte)

    sort_column = get_sort_column(sort_by, models.Vehicle, VehicleBase.model_fields)

    query = apply_sort_order(query, sort_order, sort_column)

    return query.offset(offset).limit(limit).all()


def get_vehicle(db: Session, id: int):
    vehicle = db.get(models.Vehicle, id)
    if vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle


def get_bikes(
    db: Session,
    offset: int = 0,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "asc",
    year: int = None,
    year_gte: int = None,
    year_lte: int = None,
    bike_filters: BikeFilters = None,
):
    query = (
        db.query(models.Bike)
        .join(models.Vehicle)
        .options(joinedload(models.Bike.vehicle))
    )

    query = apply_year_filter(query, year, year_gte, year_lte)

    query = apply_vehicle_type_filters(query, models.Bike, bike_filters)

    sort_column = get_sort_column(sort_by, models.Bike, BikeFilters.model_fields)

    query = apply_sort_order(query, sort_order, sort_column)

    return query.offset(offset).limit(limit).all()


def get_bike(db: Session, id: int):
    bike = db.get(models.Bike, id)
    if bike is None:
        raise HTTPException(status_code=404, detail="Bike not found")
    return bike


def get_cars(
    db: Session,
    offset: int = 0,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "asc",
    year: int = None,
    year_gte: int = None,
    year_lte: int = None,
    car_filters: CarFilters = None,
):
    query = (
        db.query(models.Car)
        .join(models.Vehicle)
        .options(joinedload(models.Car.vehicle))
    )

    query = apply_year_filter(query, year, year_gte, year_lte)

    query = apply_vehicle_type_filters(query, models.Car, car_filters)

    sort_column = get_sort_column(sort_by, models.Car, CarFilters.model_fields)

    query = apply_sort_order(query, sort_order, sort_column)

    return query.offset(offset).limit(limit).all()


def get_car(db: Session, id: int):
    car = db.get(models.Car, id)
    if car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return car


def get_spaceships(
    db: Session,
    offset: int = 0,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "asc",
    year: int = None,
    year_gte: int = None,
    year_lte: int = None,
    spaceship_filters: SpaceshipFilters = None,
):
    query = (
        db.query(models.Spaceship)
        .join(models.Vehicle)
        .options(joinedload(models.Spaceship.vehicle))
    )

    query = apply_year_filter(query, year, year_gte, year_lte)

    query = apply_vehicle_type_filters(query, models.Spaceship, spaceship_filters)

    sort_column = get_sort_column(
        sort_by, models.Spaceship, SpaceshipFilters.model_fields
    )

    query = apply_sort_order(query, sort_order, sort_column)

    return query.offset(offset).limit(limit).all()


def get_spaceship(db: Session, id: int):
    spaceship = db.get(models.Spaceship, id)
    if spaceship is None:
        raise HTTPException(status_code=404, detail="Spaceship not found")
    return spaceship


def create_bike(db: Session, bike: BikeCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=VehicleCreate(
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


def create_car(db: Session, car: CarCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=VehicleCreate(
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


def create_spaceship(db: Session, spaceship: SpaceshipCreate):
    vehicle = _create_vehicle(
        db=db,
        vehicle=VehicleCreate(
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


def _create_vehicle(db: Session, vehicle: VehicleCreate):
    vehicle_data = models.Vehicle(
        model=vehicle.model, year=vehicle.year, vehicle_type=vehicle.vehicle_type
    )
    db.add(vehicle_data)
    db.flush()
    return vehicle_data
