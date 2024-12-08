import { Bike, Car, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { VehicleType } from "../types";

interface ListItemProps {
  title: string;
  type: VehicleType;
}

export const ListItem = ({ title, type }: ListItemProps) => {
  const icon: Record<VehicleType, React.ReactNode> = {
    car: <Car size={40} />,
    bike: <Rocket size={40} />,
    spaceship: <Bike size={40} />,
  };

  return (
    <Card className='w-full transition-all bg-sky-400 hover:bg-sky-500'>
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>{title}</CardTitle>
        {icon[type]}
      </CardHeader>
    </Card>
  );
};
