import React from 'react'
import Homesidebar from '../components/Homesidebar'
import Listemployees from '../components/Listemployees'

function Viewprofilepage() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="profile"/>
            <Listemployees/>
        </div>
    )
}

export default Viewprofilepage
