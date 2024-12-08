export type VehicleType = "car" | "bike" | "spaceship";

interface CommonQueryParams {
  limit?: string;
  offset?: string;
  sort_by?: string;
  sort_order?: string;
  year?: string;
  year_gte?: string;
  year_lte?: string;
}

interface BikeQueryParams extends CommonQueryParams {
  brand?: string;
  gears?: string;
  type?: string;
  wheel_size?: string;
}

interface CarQueryParams extends CommonQueryParams {
  colour?: string;
  engine_size?: string;
  horsepower?: string;
  make?: string;
  seats?: string;
  top_speed?: string;
}

interface SpaceshipQueryParams extends CommonQueryParams {
  manufacturer?: string;
  max_crew?: string;
  top_speed?: string;
}

interface VehicleBase {
  model: string;
  year: number;
}

interface Bike {
  id: string;
  brand: string;
  gears: number;
  type: string;
  wheel_size: number;
  vehicle: VehicleBase;
}

interface Car {
  id: string;
  colour: string;
  engine_size: number;
  horsepower: number;
  make: string;
  seats: number;
  top_speed: number;
  vehicle: VehicleBase;
}

interface Spaceship {
  id: string;
  manufacturer: string;
  max_crew: number;
  top_speed: number;
  vehicle: VehicleBase;
}
