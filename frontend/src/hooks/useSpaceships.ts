import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Spaceship, SpaceshipQueryParams } from "../types";

const fetchSpaceships = (params: SpaceshipQueryParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return axios.get(`http://localhost:8000/vehicles/spaceships?${queryString}`);
};

export const useSpaceships = (params: SpaceshipQueryParams) => {
  return useQuery<AxiosResponse<Spaceship[]>, AxiosError>({
    queryKey: ["spaceships", params],
    queryFn: () => fetchSpaceships(params),
  });
};
