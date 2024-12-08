import { Bike, Car, Gauge, Rocket } from "lucide-react";
import { NavLink } from "./NavLink";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const SidebarNav = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vehicles</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <NavLink to='/bikes' icon={<Bike />} label='Bikes' />
        <NavLink to='/cars' icon={<Car />} label='Cars' />
        <NavLink to='/spaceships' icon={<Rocket />} label='Spaceships' />
        <NavLink to='/vehicles' icon={<Gauge />} label='Explore them all!' />
      </CardContent>
    </Card>
  );
};
