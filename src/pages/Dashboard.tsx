import Departments from '@/components/maincomponents/Departments'
import Homesidebar from '@/components/maincomponents/Homesidebar'
import React from 'react'
import DashBoard from '@/components/maincomponents/DashBoard'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Managerdashboard from '@/components/maincomponents/manger/Managerdashboard'
import PersonalPerformance from '@/components/maincomponents/manger/PersonalPerformance'

const Dashboard = () => {
  const role=useSelector((state:RootState)=>state.userdetails.user.Authorization)
  return (
    <div className='bg-slate-100 h-screen flex'>
    <Homesidebar page="dashboard"/>
    {role=="root_node" && <DashBoard/>}
    {role=="semi_node" && <Managerdashboard/>}
    {role=="basic_node" && <PersonalPerformance/>}
</div>
  )
}

export default Dashboard
