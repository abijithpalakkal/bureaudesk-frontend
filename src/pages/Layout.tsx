import Homenavbar from '@/components/maincomponents/Homenavbar'
import Homesidebar from '@/components/maincomponents/Homesidebar'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = ({pages}:{
    pages?:string
  
}) => {

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter(Boolean).pop();

  return (
    <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page={pathSegment}/>
            <div className='w-5/6 px-2 py-2'>
            <div>
                <Homenavbar />
            <Outlet/>
            </div>
            </div>
        </div>
  )
}

export default Layout
