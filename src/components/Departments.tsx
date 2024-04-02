
import { AiOutlinePlus } from 'react-icons/ai'

import Homenavbar from './Homenavbar'
import { useState } from 'react'
import Adddepartmentmodal from './modals/Adddepartmentmodal'
import Departmentcards from './cards/Departmentcards'

function Departments() {
  const [displaymodal, setdisplaymodal] = useState(false)
  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      {!displaymodal && <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>DEPARTMENTS</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span onClick={() => setdisplaymodal(true)}>add department</span> <span><AiOutlinePlus /></span></button>
        </div>
        <Departmentcards/>
      </div>}
      {displaymodal && <div><Adddepartmentmodal modalstatus={setdisplaymodal} /></div>}
    </div>
  )
}
export default Departments
