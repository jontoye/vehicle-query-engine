import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Bike, Car, Spaceship, Vehicle, VehicleType } from "../types";

const fetchVehicle = (id: string, type?: VehicleType) => {
  const path = type ? `vehicles/${type}/${id}` : `vehicles/${id}`
  return axios.get(`http://localhost:8000/${path}`);
};

export const useVehicle = (id: string, type?: VehicleType) => {
  return useQuery<AxiosResponse<Bike | Car | Spaceship | Vehicle>, AxiosError>({
    queryKey: ["vehicle", id, type],
    queryFn: () => fetchVehicle(id, type),
  });
};

