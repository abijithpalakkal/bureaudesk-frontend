import React from 'react'
import Viewteam from '../components/Viewteam'
import Homesidebar from '../components/Homesidebar'

function Viewteampage() {
  return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Viewteam/>
        </div>
    )
  
}

export default Viewteampage
