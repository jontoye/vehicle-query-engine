import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Car } from "../types";

const fetchCar = (id: string) => {
  return axios.get(`http://localhost:8000/vehicles/cars/${id}`);
};

export const useCar = (id: string) => {
  return useQuery<AxiosResponse<Car>, AxiosError>({
    queryKey: ["car", id],
    queryFn: () => fetchCar(id),
  });
};
