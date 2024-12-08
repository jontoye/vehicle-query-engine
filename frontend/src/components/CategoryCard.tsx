import React from 'react'
import { Card } from './ui/card'
import { VehicleType } from '../types';
import { Bike, Car, Rocket } from 'lucide-react';

interface CategoryCardProps {
  type: VehicleType;
}

export const CategoryCard = ({ type }: CategoryCardProps) => {
  const icon: Record<VehicleType, React.ReactNode> = {
    car: <Car size={80} color='white'/>,
    spaceship: <Rocket size={80} color='white'/>,
    bike: <Bike size={80} color='white'/>,
  };

  return (
    <Card className='flex flex-col items-center justify-center gap-4 transition-all bg-red-500 h-44 hover:bg-red-600'>
      {icon[type]}
      <span className='font-semibold text-white uppercase'>{type}s</span>
    </Card>
  )
}
