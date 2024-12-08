import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Dropdown from "../components/Dropdown";
import { ListEmpy } from "../components/ListEmpy";
import { ListItem } from "../components/ListItem";
import { ListSkeleton } from "../components/ListSkeleton";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useBikes } from "../hooks/useBikes";
import {
  BIKE_TYPE_OPTIONS,
  DEFAULT_RESULT_LIMIT,
  GEARS_OPTIONS,
  NUM_RESULTS_OPTIONS,
  YEAR_OPTIONS,
} from "../lib/constants";
import { filterUndefined } from "../lib/utils";
import { SidebarNav } from "../components/SidebarNav";

export const Bikes = () => {
  const [gears, setGears] = useState<string>();
  const [bikeType, setBikeType] = useState<string>();
  const [minYear, setMinYear] = useState<string>();
  const [maxYear, setMaxYear] = useState<string>();
  const [exactYear, setExactYear] = useState<string>();

  const [limit, setLimit] = useState<string>(DEFAULT_RESULT_LIMIT);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setGears(searchParams.get("gears") ?? undefined);
    setBikeType(searchParams.get("type") ?? undefined);
    setMinYear(searchParams.get("year_gte") ?? undefined);
    setMaxYear(searchParams.get("year_lte") ?? undefined);
    setExactYear(searchParams.get("year") ?? undefined);
    setLimit(searchParams.get("limit") ?? DEFAULT_RESULT_LIMIT);
  }, [searchParams]);

  const queryParams = filterUndefined({
    limit: searchParams.get("limit") ?? undefined,
    offset: searchParams.get("offset") ?? undefined,
    sort_by: searchParams.get("sort_by") ?? undefined,
    sort_order: searchParams.get("sort_order") ?? undefined,
    year: searchParams.get("year") ?? undefined,
    year_gte: searchParams.get("year_gte") ?? undefined,
    year_lte: searchParams.get("year_lte") ?? undefined,
    brand: searchParams.get("brand") ?? undefined,
    gears: searchParams.get("gears") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    wheel_size: searchParams.get("wheel_size") ?? undefined,
  });

  const { data, status, error } = useBikes(queryParams);

  const handleGearsFilterChange = (value: string) => {
    setGears(value);
  };

  const handleBikeTypeChange = (value: string) => {
    setBikeType(value);
  };

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
    setGears(undefined);
    setBikeType(undefined);
    setMinYear(undefined);
    setMaxYear(undefined);
    setExactYear(undefined);
    setLimit(DEFAULT_RESULT_LIMIT);
  };

  const handleApplyFilter = () => {
    if (gears) {
      searchParams.set("gears", gears);
    } else {
      searchParams.delete("gears");
    }

    if (bikeType) {
      searchParams.set("type", bikeType);
    } else {
      searchParams.delete("type");
    }

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
      <div className='flex flex-col w-64 gap-2'>
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <Dropdown label='Type' value={bikeType} options={BIKE_TYPE_OPTIONS} onChange={handleBikeTypeChange} />
            <Dropdown label='Gears' value={gears} options={GEARS_OPTIONS} onChange={handleGearsFilterChange} />
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

        <SidebarNav />
      </div>
      <div className='flex flex-col flex-1 w-full gap-4'>
        {status === "pending" && <ListSkeleton />}

        {status === "error" && <p>Whoops, something went wrong: {error.message}</p>}

        {status === "success" &&
          (data.data.length === 0 ? (
            <ListEmpy />
          ) : (
            data.data.map((bike) => (
              <Link key={bike.id} to={`/bikes/${bike.id}`}>
                <ListItem title={`${bike.vehicle.year} ${bike.vehicle.model}`} type='bike' />
              </Link>
            ))
          ))}
      </div>
    </div>
  );
};
