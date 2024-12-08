import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Car, CarQueryParams } from "../types";

const fetchCars = (params: CarQueryParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return axios.get(`http://localhost:8000/vehicles/cars?${queryString}`);
};

export const useCars = (params: CarQueryParams) => {
  return useQuery<AxiosResponse<Car[]>, AxiosError>({
    queryKey: ["cars", params],
    queryFn: () => fetchCars(params),
  });
};
