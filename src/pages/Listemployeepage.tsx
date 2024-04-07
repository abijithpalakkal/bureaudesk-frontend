import React from 'react'
import Homesidebar from '../components/Homesidebar'
import Listemployees from '../components/Listemployees'

function Listemployeepage() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Listemployees/>
        </div>
    )
}

export default Listemployeepage
