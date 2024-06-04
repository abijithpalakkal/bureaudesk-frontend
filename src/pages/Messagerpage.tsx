import Homesidebar from '@/components/maincomponents/Homesidebar'
import Messenger from '@/components/maincomponents/Messenger'
import React from 'react'

const Messagerpage = () => {
    return (
        <div className='bg-slate-100 flex'>
               
                <Homesidebar page="messenger" />
                <Messenger/>
            </div>
    
      )
}

export default Messagerpage
