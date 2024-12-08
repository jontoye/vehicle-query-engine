import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { CommonQueryParams, Vehicle } from "../types";

const fetchVehicles = (params: CommonQueryParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return axios.get(`http://localhost:8000/vehicles?${queryString}`);
};

export const useVehicles = (params: CommonQueryParams) => {
  return useQuery<AxiosResponse<Vehicle[]>>({
    queryKey: ["vehicles", params],
    queryFn: () => fetchVehicles(params),
  });
};
