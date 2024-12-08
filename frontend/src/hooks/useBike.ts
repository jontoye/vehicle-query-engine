import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Bike } from "../types";

const fetchBike = (id: string) => {
  return axios.get(`http://localhost:8000/vehicles/bikes/${id}`);
};

export const useBike = (id: string) => {
  return useQuery<AxiosResponse<Bike>, AxiosError>({
    queryKey: ["bike", id],
    queryFn: () => fetchBike(id),
  });
};
