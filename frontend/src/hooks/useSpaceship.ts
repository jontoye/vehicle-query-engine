import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Spaceship } from "../types";

const fetchSpaceship = (id: string) => {
  return axios.get(`http://localhost:8000/vehicles/spaceships/${id}`);
};

export const useSpaceship = (id: string) => {
  return useQuery<AxiosResponse<Spaceship>, AxiosError>({
    queryKey: ["spaceship", id],
    queryFn: () => fetchSpaceship(id),
  });
};
