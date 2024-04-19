import React from 'react'
import Viewteam from '../components/maincomponents/Viewteam'
import Homesidebar from '../components/maincomponents/Homesidebar'

function Viewteampage() {
  return (
        <div className='bg-slate-100 h-screen flex'>
            <Homesidebar page="department"/>
            <Viewteam/>
        </div>
    )
  
}

export default Viewteampage
