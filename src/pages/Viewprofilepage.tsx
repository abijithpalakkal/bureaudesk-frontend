import React from 'react'
import Homesidebar from '../components/Homesidebar'
import Listemployees from '../components/Listemployees'
import Viewprofile from '../components/Viewprofile'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Viewprofilepage() {
    const id=useSelector((state:RootState)=>state.userdetails.user._id)
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="profile"/>
            <Viewprofile id={id as string}/>
        </div>
    )
}

export default Viewprofilepage
