import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Dropdown from "../components/Dropdown";
import { ListEmpy } from "../components/ListEmpy";
import { ListItem } from "../components/ListItem";
import { ListSkeleton } from "../components/ListSkeleton";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useVehicles } from "../hooks/useVehicles";
import { DEFAULT_RESULT_LIMIT, NUM_RESULTS_OPTIONS, YEAR_OPTIONS } from "../lib/constants";
import { filterUndefined } from "../lib/utils";
import { VehicleType } from "../types";

export const ViewAll = () => {
  const [minYear, setMinYear] = useState<string>();
  const [maxYear, setMaxYear] = useState<string>();
  const [exactYear, setExactYear] = useState<string>();

  const [limit, setLimit] = useState<string>(DEFAULT_RESULT_LIMIT);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setMinYear(searchParams.get("year_gte") ?? undefined);
    setMaxYear(searchParams.get("year_lte") ?? undefined);
    setExactYear(searchParams.get("year") ?? undefined);
    setLimit(searchParams.get("limit") ?? DEFAULT_RESULT_LIMIT);
  }, [searchParams]);

  const queryParams = filterUndefined({
    limit: searchParams.get("limit") ?? undefined,
    offset: searchParams.get("offset") ?? undefined,

    // Default sort by year desc, to highlight newest vehicles first
    sort_by: searchParams.get("sort_by") ?? "year",
    sort_order: searchParams.get("sort_order") ?? "desc",

    year: searchParams.get("year") ?? undefined,
    year_gte: searchParams.get("year_gte") ?? undefined,
    year_lte: searchParams.get("year_lte") ?? undefined,
  });

  const { data, status, error } = useVehicles(queryParams);

  const handleMinYearChange = (value: string) => {
    setExactYear(undefined);
    setMinYear(value);
  };

  const handleMaxYearChange = (value: string) => {
    setExactYear(undefined);
    setMaxYear(value);
  };

  const handleExactYearChange = (value: string) => {
    setMinYear(undefined);
    setMaxYear(undefined);
    setExactYear(value);
  };

  const handleLimitChange = (value: string) => {
    setLimit(value);
  };

  const handleClearFilters = () => {
    setMinYear(undefined);
    setMaxYear(undefined);
    setExactYear(undefined);
    setLimit(DEFAULT_RESULT_LIMIT);
  };

  const handleApplyFilter = () => {
    if (minYear) {
      searchParams.set("year_gte", minYear);
      searchParams.delete("year");
    } else {
      searchParams.delete("year_gte");
    }

    if (maxYear) {
      searchParams.set("year_lte", maxYear);
      searchParams.delete("year");
    } else {
      searchParams.delete("year_lte");
    }

    if (exactYear) {
      searchParams.set("year", exactYear);
      searchParams.delete("year_gte");
      searchParams.delete("year_lte");
    } else {
      searchParams.delete("year");
    }

    if (limit) {
      searchParams.set("limit", limit);
    } else {
      searchParams.delete("limit");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className='flex w-full gap-4'>
      <Card className='sticky w-64 top-8 h-fit'>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Dropdown label='Min Year' value={minYear} options={YEAR_OPTIONS} onChange={handleMinYearChange} />
          <Dropdown label='Max Year' value={maxYear} options={YEAR_OPTIONS} onChange={handleMaxYearChange} />
          <Dropdown label='Exact Year' value={exactYear} options={YEAR_OPTIONS} onChange={handleExactYearChange} />
          <Dropdown label='Num Results' value={limit} options={NUM_RESULTS_OPTIONS} onChange={handleLimitChange} />

          <Button onClick={handleApplyFilter}>Apply</Button>
          <Button variant='outline' onClick={handleClearFilters}>
            Reset
          </Button>
        </CardContent>
      </Card>
      <div className='flex flex-col flex-1 w-full gap-4'>
        {status === "pending" && <ListSkeleton />}

        {status === "error" && <p>Whoops, something went wrong: {error.message}</p>}

        {status === "success" &&
          (data.data.length === 0 ? (
            <ListEmpy />
          ) : (
            data.data.map((vehicle) => (
              <Link key={vehicle.id} to={`/vechiles/${vehicle.id}`}>
                <ListItem
                  title={`${vehicle.year} ${vehicle.model}`}
                  type={vehicle.vehicle_type.toLowerCase() as VehicleType}
                />
              </Link>
            ))
          ))}
      </div>
    </div>
  );
};
