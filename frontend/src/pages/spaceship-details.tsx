import { useParams } from "react-router";
import { ListSkeleton } from "../components/ListSkeleton";
import { SidebarNav } from "../components/SidebarNav";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useSpaceship } from "../hooks/useSpaceship";

export const SpaceshipDetails = () => {
  const { spaceship_id } = useParams();

  if (!spaceship_id) {
    throw Error("Missing spaceship_id url param");
  }

  const { data, status, error } = useSpaceship(spaceship_id);

  const spaceship = data?.data;

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
                {spaceship?.vehicle.year} {spaceship?.vehicle.model}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              <p>Manufacturer: {spaceship?.manufacturer}</p>
              <p>Max Crew: {spaceship?.max_crew}</p>
              <p>Top Speed: {spaceship?.top_speed}c</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
