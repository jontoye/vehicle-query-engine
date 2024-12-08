from pydantic import BaseModel, Field, field_validator
from typing import Optional
from enums import BikeType, VehicleType


class FilterParams(BaseModel):
    limit: int = Field(10, gt=0, le=150)
    offset: int = Field(0, ge=0)
    sort_by: str = Field("id")
    sort_order: str = Field("asc", pattern="^(asc|desc)$")
    year: Optional[int | str] = None
    year_gte: Optional[int | str] = None
    year_lte: Optional[int | str] = None

    @field_validator("year", "year_gte", "year_lte")
    def ignore_year_if_not_int(cls, v):
        if v is None:
            return v
        try:
            return int(v)
        except ValueError:
            return None


class VehicleBase(BaseModel):
    model: str
    year: int


class VehicleResponse(VehicleBase):
    id: int
    vehicle_type: VehicleType


class VehicleCreate(VehicleBase):
    vehicle_type: VehicleType


class BikeBase(BaseModel):
    brand: str
    gears: int
    type: BikeType
    wheel_size: float


class BikeFilters(BaseModel):
    brand: Optional[str] = None
    gears: Optional[int] = None
    type: Optional[BikeType] = None
    wheel_size: Optional[float] = None


class BikeResponse(BikeBase):
    id: int
    vehicle: VehicleBase


class BikeCreate(BikeBase, VehicleBase):
    pass


class CarBase(BaseModel):
    colour: str
    engine_size: float
    horsepower: int
    make: str
    seats: int
    top_speed: float


class CarFilters(BaseModel):
    colour: Optional[str] = None
    engine_size: Optional[float] = None
    horsepower: Optional[int] = None
    make: Optional[str] = None
    seats: Optional[int] = None
    top_speed: Optional[float] = None


class CarResponse(CarBase):
    id: int
    vehicle: VehicleBase


class CarCreate(CarBase, VehicleBase):
    pass


class SpaceshipBase(BaseModel):
    manufacturer: str
    max_crew: int
    top_speed: float


class SpaceshipFilters(BaseModel):
    manufacturer: Optional[str] = None
    max_crew: Optional[int] = None
    top_speed: Optional[float] = None


class SpaceshipCreate(SpaceshipBase, VehicleBase):
    pass


class SpaceshipResponse(SpaceshipBase):
    id: int
    vehicle: VehicleBase
