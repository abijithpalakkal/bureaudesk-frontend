import React from 'react'
import Homesidebar from '../components/maincomponents/Homesidebar'
import Listemployees from '../components/maincomponents/Listemployees'
import { useLocation } from 'react-router-dom'

function Listemployeepage() {
    const {state}=useLocation()
    console.log(state)
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Listemployees department={state}/>
        </div>
    )
}

export default Listemployeepage
