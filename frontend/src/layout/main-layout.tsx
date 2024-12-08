import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div className='max-w-6xl py-10 mx-auto'>
      <h1 className='text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl'>
        Vehicle Query Engine
      </h1>
      <div className='flex items-center justify-center mt-20'>
        <Outlet />
      </div>
    </div>
  );
};
