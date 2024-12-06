from enum import Enum

class VehicleType(str, Enum):
    CAR = "Car"
    BIKE = "Bike"
    SPACESHIP = "Spaceship"


class BikeType(str, Enum):
    BMX = "BMX"
    ROAD = "Road"
    CITY = "City"
    MOUNTAIN = "Mountain"
    HYBRID = "Hybrid"