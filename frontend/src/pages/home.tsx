import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

type VehicleType = "car" | "bike" | "spaceship";


const vechileTypePathMap: Record<VehicleType, string> = {
  car: 'cars',
  bike: 'bikes',
  spaceship: 'spaceships'
}

export const Home = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<VehicleType>();
  const [year, setYear] = useState<string>("2024");
  const [isError, setIsError] = useState(false);

  const years = Array.from({ length: 2024 - 1950 + 1 }, (_, index) => (1950 + index).toString());

  const handleTypeInputChange = (value: VehicleType) => {
    setIsError(false);
    setType(value);
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
    navigate({pathname: vechileTypePathMap[type], search: `?year=${year}`})
  };

  return (
    <>
      <div className='flex items-center justify-center mt-32'>
        <Tabs defaultValue='search' className='w-[650px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='search'>I know what I want</TabsTrigger>
            <TabsTrigger value='explore'>Help me choose</TabsTrigger>
          </TabsList>

          <TabsContent value='search'>
            <Card>
              <CardHeader>
                <CardTitle>Find your next vehicle</CardTitle>
                <CardDescription>Wherever you are going, we can help you get there</CardDescription>
              </CardHeader>

              <CardContent className='space-y-2'>
                <div className='flex gap-4'>
                  <div className='flex-1 space-y-1'>
                    <Label htmlFor='type-input'>Type</Label>
                    <Select value={type} onValueChange={handleTypeInputChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='---' id='type-input' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='bike'>Bike</SelectItem>
                          <SelectItem value='car'>Car</SelectItem>
                          <SelectItem value='spaceship'>Spaceship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='flex-1 space-y-1'>
                    <Label htmlFor='year-input'>Year</Label>
                    <Select value={year} onValueChange={handleYearInputChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='---' id='year-input' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isError && (
                  <Alert variant='destructive'>
                    <AlertTitle>OOPS</AlertTitle>
                    <AlertDescription>
                      We can't find you a vehicle if you don't know what you're looking for! Select a type and year above to proceed.
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
              <CardHeader>
                <CardTitle>Explore them all!</CardTitle>
                <CardDescription>
                  Can't decide between a bike, a car, or a spaceship? You came to right place
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-2'>
                <p>CARS</p>
                <p>BIKES</p>
                <p>SPACESHIPS</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
