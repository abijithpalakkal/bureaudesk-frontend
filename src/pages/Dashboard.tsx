import Departments from '@/components/maincomponents/Departments'
import Homesidebar from '@/components/maincomponents/Homesidebar'
import React from 'react'
import DashBoard from '@/components/maincomponents/DashBoard'

const Dashboard = () => {
  return (
    <div className='bg-slate-100 h-screen flex'>
    <Homesidebar page="dashboard"/>
    <DashBoard/>
</div>
  )
}

export default Dashboard
