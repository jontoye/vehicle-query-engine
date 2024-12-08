import { Car } from "lucide-react";
import { useParams } from "react-router";
import { ListSkeleton } from "../components/ListSkeleton";
import { SidebarNav } from "../components/SidebarNav";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useCar } from "../hooks/useCar";

export const CarDetails = () => {
  const { car_id } = useParams();

  if (!car_id) {
    throw Error("Missing car_id url param");
  }

  const { data, status, error } = useCar(car_id);

  const car = data?.data;

  return (
    <div className='flex w-full gap-4'>
      <div className='sticky w-64 top-8 h-fit'>
        <SidebarNav />
      </div>
      <div className='flex flex-col flex-1 w-full gap-4'>
        {status === "pending" && <ListSkeleton />}

        {status === "error" && <p>Whoops, something went wrong: {error.message}</p>}

        {status === "success" && (
          <Card className='w-full transition-all bg-sky-400'>
            <CardHeader className='flex-row items-center justify-between'>
              <CardTitle>
                {car?.vehicle.year} {car?.vehicle.model}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>Make: {car?.make}</p>
              <p className="flex gap-2">Colour: {car?.colour} <Car color={car?.colour} /></p>
              <p>Engine Size: {car?.engine_size}L</p>
              <p>Horsepower: {car?.horsepower}hp</p>
              <p>Seats: {car?.seats}</p>
              <p>Top Speed: {car?.top_speed} km/h</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
