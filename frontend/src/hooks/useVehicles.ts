import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface VehicleQueryParams {
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: string;
  year?: number | string;
  year_gte?: number | string;
  year_lte?: number | string;
}

const fetchVehicles = (params: VehicleQueryParams) => {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  return axios.get(`http://localhost:8000/vehicles?${queryString}`);
};

export const useVehicles = (params: VehicleQueryParams) => {
  return useQuery({
    queryKey: ["vehicles", params],
    queryFn: () => fetchVehicles(params),
  });
};
