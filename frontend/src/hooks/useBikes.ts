import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Bike, BikeQueryParams } from "../types";

const fetchBikes = (params: BikeQueryParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return axios.get(`http://localhost:8000/vehicles/bikes?${queryString}`);
};

export const useBikes = (params: BikeQueryParams) => {
  return useQuery<AxiosResponse<Bike[]>, AxiosError>({
    queryKey: ["bikes", params],
    queryFn: () => fetchBikes(params),
  });
};
