import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { CategoryCard } from "../components/CategoryCard";
import Dropdown from "../components/Dropdown";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { YEAR_OPTIONS } from "../lib/constants";
import { VehicleType } from "../types";

const vechileTypePathMap: Record<VehicleType, string> = {
  car: "cars",
  bike: "bikes",
  spaceship: "spaceships",
};

export const Home = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<VehicleType>();
  const [year, setYear] = useState<string>("2024");
  const [isError, setIsError] = useState(false);

  const handleTypeInputChange = (value: string) => {
    setIsError(false);
    setType(value as VehicleType);
  };

  const handleYearInputChange = (value: string) => {
    setIsError(false);
    setYear(value);
  };

  const handleSearch = () => {
    if (!type || !year) {
      setIsError(true);
      return;
    }
    navigate({ pathname: vechileTypePathMap[type], search: `?year=${year}` });
  };

  return (
    <>
      <Tabs defaultValue='search' className='w-[650px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='search'>I know what I want</TabsTrigger>
          <TabsTrigger value='explore'>Help me choose</TabsTrigger>
        </TabsList>

        <TabsContent value='search'>
          <Card>
            <CardHeader>
              <CardTitle>Discover Your Next Vehicle</CardTitle>
              <CardDescription>From everyday commutes to epic space voyages, find your perfect match.</CardDescription>
            </CardHeader>

            <CardContent className='space-y-2'>
              <div className='flex gap-4'>
                <Dropdown
                  label='Type'
                  options={[
                    { label: "Bike", value: "bike" },
                    { label: "Car", value: "car" },
                    { label: "Spaceship", value: "spaceship" },
                  ]}
                  onChange={handleTypeInputChange}
                  value={type}
                />

                <Dropdown label='Year' options={YEAR_OPTIONS} onChange={handleYearInputChange} value={year} />
              </div>

              {isError && (
                <Alert variant='destructive'>
                  <AlertTitle>OOPS</AlertTitle>
                  <AlertDescription>
                    We can't find you a vehicle if you don't know what you're looking for! Select a type and year above
                    to proceed.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className='justify-end'>
              <Button size='lg' className='w-48' onClick={handleSearch}>
                Search
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='explore'>
          <Card>
            <CardHeader className="flex-row items-end justify-between">
              <div className=''>
                <CardTitle>Explore them all!</CardTitle>
                <CardDescription>Unsure what to choose? Explore all your options here.</CardDescription>
              </div>
              <Link to="/vehicles" className="flex items-center gap-1 hover:underline">
                View all <ArrowRight size={16}/>
              </Link>
            </CardHeader>

            <CardContent className='flex items-center justify-between gap-6'>
              <Link to='/bikes' className='flex-1'>
                <CategoryCard type='bike' />
              </Link>
              <Link to='/cars' className='flex-1'>
                <CategoryCard type='car' />
              </Link>
              <Link to='/spaceships' className='flex-1'>
                <CategoryCard type='spaceship' />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
