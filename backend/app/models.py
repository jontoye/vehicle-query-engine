from typing import List

from database import Base
from enums import BikeType, VehicleType
from sqlalchemy import Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    model: Mapped[str] = mapped_column(String, nullable=False, index=True)
    year: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    vehicle_type: Mapped[VehicleType] = mapped_column(
        Enum(VehicleType), nullable=False, index=True
    )

    bikes: Mapped[List["Bike"]] = relationship("Bike", back_populates="vehicle")
    cars: Mapped[List["Car"]] = relationship("Car", back_populates="vehicle")
    spaceships: Mapped[List["Spaceship"]] = relationship(
        "Spaceship", back_populates="vehicle"
    )


class Bike(Base):
    __tablename__ = "bikes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    vehicle_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("vehicles.id"), index=True
    )
    brand: Mapped[str] = mapped_column(String, nullable=False, index=True)
    gears: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    type: Mapped[BikeType] = mapped_column(Enum(BikeType), nullable=False, index=True)
    wheel_size: Mapped[float] = mapped_column(Float, nullable=False, index=True)

    vehicle: Mapped["Vehicle"] = relationship("Vehicle", back_populates="bikes")


class Car(Base):
    __tablename__ = "cars"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    vehicle_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("vehicles.id"), index=True
    )
    colour: Mapped[str] = mapped_column(String, nullable=False, index=True)
    engine_size: Mapped[float] = mapped_column(Float, nullable=False, index=True)
    horsepower: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    make: Mapped[str] = mapped_column(String, nullable=False, index=True)
    seats: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    top_speed: Mapped[float] = mapped_column(Float, nullable=False, index=True)

    vehicle: Mapped["Vehicle"] = relationship("Vehicle", back_populates="cars")


class Spaceship(Base):
    __tablename__ = "spaceships"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    vehicle_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("vehicles.id"), index=True
    )
    manufacturer: Mapped[str] = mapped_column(String, nullable=False, index=True)
    max_crew: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    top_speed: Mapped[float] = mapped_column(Float, nullable=False, index=True)

    vehicle: Mapped["Vehicle"] = relationship("Vehicle", back_populates="spaceships")
