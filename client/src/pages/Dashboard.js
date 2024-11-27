import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Dashboard/SideBar';

const Dashboard = () => {
  
  const {loading} = useSelector((state) => state.auth);

  if(loading) {
    return (<div className='flex items-center justify-center text-white'>
      Loading...
    </div>)
  }

  return (
    <div className='relative mt-14 text-white flex min-h-[100vh-3.5rem]'>
        <SideBar />

        <div className='relative lg:left-[222px] text-white w-full lg:w-[calc(100vw-222px)] min-h-[100vh-3.5rem] overflow-y-auto overflow-x-hidden'>
          <div className='max-w-[1200px] text-white w-full mx-auto py-10'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Dashboard
