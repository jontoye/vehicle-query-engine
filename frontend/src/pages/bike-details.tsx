import { useParams } from "react-router";
import { ListSkeleton } from "../components/ListSkeleton";
import { SidebarNav } from "../components/SidebarNav";
import { useBike } from "../hooks/useBike";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const BikeDetails = () => {
  const { bike_id } = useParams();

  if (!bike_id) {
    throw Error("Missing bike_id url param");
  }

  const { data, status, error } = useBike(bike_id);

  const bike = data?.data;

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
                {bike?.vehicle.year} {bike?.vehicle.model}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>Brand: {bike?.brand}</p>
              <p>Gears: {bike?.gears}</p>
              <p>Wheel Size: {bike?.wheel_size}</p>
              <p>Type: {bike?.type}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
