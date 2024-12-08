from app.models import Spaceship, Vehicle, Car, Bike
from app.enums import VehicleType, BikeType


def test_root(test_client):
    response = test_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello VQE!"}


def test_get_bikes(test_client, db_session):
    vechile_1 = Vehicle(
        id=10, model="MODEL A", year=2023, vehicle_type=VehicleType.BIKE
    )
    bike_1 = Bike(
        id=1,
        brand="EraCraft",
        gears=3,
        type=BikeType.ROAD,
        wheel_size=29,
        vehicle_id=vechile_1.id,
    )
    vechile_2 = Vehicle(
        id=11, model="MODEL B", year=2024, vehicle_type=VehicleType.BIKE
    )
    bike_2 = Bike(
        id=2,
        brand="GreenVolt",
        gears=14,
        type=BikeType.BMX,
        wheel_size=12,
        vehicle_id=vechile_2.id,
    )
    db_session.add_all([vechile_1, vechile_2, bike_1, bike_2])
    db_session.commit()

    response = test_client.get("/vehicles/bikes")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "brand": "EraCraft",
            "gears": 3,
            "type": "Road",
            "wheel_size": 29,
            "vehicle": {"model": vechile_1.model, "year": vechile_1.year},
        },
        {
            "id": 2,
            "brand": "GreenVolt",
            "gears": 14,
            "type": "BMX",
            "wheel_size": 12,
            "vehicle": {"model": vechile_2.model, "year": vechile_2.year},
        },
    ]


def test_get_cars(test_client, db_session):
    vechile_1 = Vehicle(id=10, model="MODEL A", year=2023, vehicle_type=VehicleType.CAR)
    car_1 = Car(
        id=1,
        colour="SteelBlue",
        engine_size=4.8,
        horsepower=214,
        make="Astoria Automotive",
        seats=5,
        top_speed=253.6,
        vehicle_id=vechile_1.id,
    )
    vechile_2 = Vehicle(id=11, model="MODEL B", year=2024, vehicle_type=VehicleType.CAR)
    car_2 = Car(
        id=2,
        colour="HotPink",
        engine_size=1.3,
        horsepower=351,
        make="Falcon Exotics",
        seats=8,
        top_speed=273.4,
        vehicle_id=vechile_2.id,
    )
    db_session.add_all([vechile_1, vechile_2, car_1, car_2])
    db_session.commit()

    response = test_client.get("/vehicles/cars")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "colour": "SteelBlue",
            "engine_size": 4.8,
            "horsepower": 214,
            "make": "Astoria Automotive",
            "seats": 5,
            "top_speed": 253.6,
            "vehicle": {"model": vechile_1.model, "year": vechile_1.year},
        },
        {
            "id": 2,
            "colour": "HotPink",
            "engine_size": 1.3,
            "horsepower": 351,
            "make": "Falcon Exotics",
            "seats": 8,
            "top_speed": 273.4,
            "vehicle": {"model": vechile_2.model, "year": vechile_2.year},
        },
    ]


def test_get_spaceships(test_client, db_session):
    vechile_1 = Vehicle(
        id=10, model="MODEL A", year=2023, vehicle_type=VehicleType.SPACESHIP
    )
    spaceship_1 = Spaceship(
        id=1,
        manufacturer="AetherForge",
        max_crew=400,
        top_speed=0.7879,
        vehicle_id=vechile_1.id,
    )
    vechile_2 = Vehicle(
        id=11, model="MODEL B", year=2024, vehicle_type=VehicleType.SPACESHIP
    )
    spaceship_2 = Spaceship(
        id=2,
        manufacturer="Defender Dynamics",
        max_crew=8000,
        top_speed=0.83108,
        vehicle_id=vechile_2.id,
    )
    db_session.add_all([vechile_1, vechile_2, spaceship_1, spaceship_2])
    db_session.commit()

    response = test_client.get("/vehicles/spaceships")

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "manufacturer": "AetherForge",
            "max_crew": 400,
            "top_speed": 0.7879,
            "vehicle": {"model": vechile_1.model, "year": vechile_1.year},
        },
        {
            "id": 2,
            "manufacturer": "Defender Dynamics",
            "max_crew": 8000,
            "top_speed": 0.83108,
            "vehicle": {"model": vechile_2.model, "year": vechile_2.year},
        },
    ]
