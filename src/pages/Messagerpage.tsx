import Homesidebar from '@/components/maincomponents/Homesidebar'
import Messenger from '@/components/maincomponents/Messenger'
import React, { useState } from 'react'
import Zegocloud from '@/components/helpers/Zegocloud'

const Messagerpage = () => {

    const [zeegoCloud, setZeegooCloud] = useState(false)
    const [url,setUrl]=useState("")

    return (
        <>
       {!zeegoCloud &&  <div className='bg-slate-100 flex'>
               
               <Homesidebar page="messenger" />
               <Messenger setZeegooCloud={setZeegooCloud} url={url}/>

           </div>}
          {zeegoCloud && <Zegocloud  displayCloud={setZeegooCloud} seturl={setUrl}/>}
        </>
        
      )
}

export default Messagerpage
