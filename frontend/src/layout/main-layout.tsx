import { Gauge } from "lucide-react";
import { Link, Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className='max-w-6xl py-10 mx-auto'>
      <Link to="/" className='absolute flex items-center gap-2 transition-all left-8 top-8 hover:underline underline-offset-4 decoration-red-500'>
        <Gauge size={50} className="text-red-500"/>
        <span className="font-mono text-lg text-white">VQE Home</span>
      </Link>
      <h1 className='text-4xl font-extrabold tracking-tight text-center text-white scroll-m-20 lg:text-5xl'>
        Vehicle Query Engine
      </h1>
      <div className='flex items-center justify-center mt-16'>
        <Outlet />
      </div>
    </div>
  );
};
