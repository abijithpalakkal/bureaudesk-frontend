import React from 'react'
import Homesidebar from '../components/maincomponents/Homesidebar'
import Listemployees from '../components/maincomponents/Listemployees'
import Events from '../components/maincomponents/Events'

function Eventspage() {
    return (
        <div className='bg-slate-100 flex'>
           
            <Homesidebar page="events" />
            <Events/>
        </div>
    )
}

export default Eventspage
