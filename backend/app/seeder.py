import json

from dotenv import load_dotenv

load_dotenv()

from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal
from .enums import BikeType


def seed_data():
    # Open a new database session
    db = SessionLocal()

    try:
        # Seed Bikes
        with open("app/data/bikes.json") as f:
            bikes = json.load(f)
            for bike in bikes:
                bike_data = schemas.BikeCreate(
                    model=bike["model"],
                    year=bike["year"],
                    brand=bike["brand"],
                    gears=bike["gears"],
                    type=BikeType[bike["type"].upper()],
                    wheel_size=bike["wheel_size"],
                )
                crud.create_bike(db, bike_data)

        # Seed Cars
        with open("app/data/cars.json") as f:
            cars = json.load(f)
            for car in cars:
                car_data = schemas.CarCreate(
                    model=car["model"],
                    year=car["year"],
                    colour=car["colour"],
                    engine_size=car["engine_size"],
                    horsepower=car["horsepower"],
                    make=car["make"],
                    seats=car["seats"],
                    top_speed=car["top_speed"],
                )
                crud.create_car(db, car_data)

        # Seed Spaceships
        with open("app/data/spaceships.json") as f:
            spaceships = json.load(f)
            for spaceship in spaceships:
                spaceship_data = schemas.SpaceshipCreate(
                    model=spaceship["model"],
                    year=spaceship["year"],
                    manufacturer=spaceship["manufacturer"],
                    max_crew=spaceship["max_crew"],
                    top_speed=spaceship["top_speed"],
                )
                crud.create_spaceship(db, spaceship_data)

        # Commit the transaction
        db.commit()
        print("Database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding data: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
