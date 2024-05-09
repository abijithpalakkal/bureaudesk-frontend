import Homesidebar from '@/components/maincomponents/Homesidebar'
import Project from '@/components/maincomponents/Project'
import React from 'react'

const Projectpage = () => {
  return (
    <div className='bg-slate-100 flex'>
           
            <Homesidebar page="projects" />
            <Project/>
        </div>

  )
}

export default Projectpage
