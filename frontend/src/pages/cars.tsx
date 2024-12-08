import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Dropdown from "../components/Dropdown";
import { ListItem } from "../components/ListItem";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCars } from "../hooks/useCars";
import { DEFAULT_RESULT_LIMIT, NUM_RESULTS_OPTIONS, SEAT_OPTIONS, YEAR_OPTIONS } from "../lib/constants";
import { filterUndefined } from "../lib/utils";
import { ListSkeleton } from "../components/ListSkeleton";
import { ListEmpy } from "../components/ListEmpy";
import { SidebarNav } from "../components/SidebarNav";

export const Cars = () => {
  const [seatFilter, setSeatFilter] = useState<string>();
  const [minYear, setMinYear] = useState<string>();
  const [maxYear, setMaxYear] = useState<string>();
  const [exactYear, setExactYear] = useState<string>();

  const [limit, setLimit] = useState<string>(DEFAULT_RESULT_LIMIT);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSeatFilter(searchParams.get("seats") ?? undefined);
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
    colour: searchParams.get("colour") ?? undefined,
    engine_size: searchParams.get("engine_size") ?? undefined,
    horsepower: searchParams.get("horsepower") ?? undefined,
    make: searchParams.get("make") ?? undefined,
    seats: searchParams.get("seats") ?? undefined,
    top_speed: searchParams.get("top_speed") ?? undefined,
  });

  const { data, status, error } = useCars(queryParams);

  const handleSeatFilterChange = (value: string) => {
    setSeatFilter(value);
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
    setSeatFilter(undefined);
    setMinYear(undefined);
    setMaxYear(undefined);
    setExactYear(undefined);
    setLimit(DEFAULT_RESULT_LIMIT);
  };

  const handleApplyFilter = () => {
    if (seatFilter) {
      searchParams.set("seats", seatFilter);
    } else {
      searchParams.delete("seats");
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
            <Dropdown label='Seats' value={seatFilter} options={SEAT_OPTIONS} onChange={handleSeatFilterChange} />
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
            data.data.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`}>
                <ListItem title={`${car.vehicle.year} ${car.vehicle.model}`} type='car' />
              </Link>
            ))
          ))}
      </div>
    </div>
  );
};
