from pydantic import BaseModel
from enums import BikeType, VehicleType


class VehicleBase(BaseModel):
    model: str
    year: int


class VehicleCreate(VehicleBase):
    vehicle_type: VehicleType


class Vehicle(VehicleBase):
    id: int
    vehicle_type: VehicleType

    class Config:
        form_attributes = True


class BikeBase(BaseModel):
    brand: str
    gears: int
    type: BikeType
    wheel_size: float


class BikeCreate(BikeBase, VehicleBase):
    pass


class Bike(BikeBase):
    id: int
    vehicle_id: int

    class Config:
        form_attributes = True


class CarBase(BaseModel):
    colour: str
    engine_size: float
    horsepower: int
    make: str
    seats: int
    top_speed: float


class CarCreate(CarBase, VehicleBase):
    pass


class Car(CarBase):
    id: int
    vehicle_id: int

    class Config:
        form_attributes = True


class SpaceshipBase(BaseModel):
    manufacturer: str
    max_crew: int
    top_speed: float


class SpaceshipCreate(SpaceshipBase, VehicleBase):
    pass


class Spaceship(SpaceshipBase):
    id: int
    vehicle_id: int

    class Config:
        form_attributes = True
