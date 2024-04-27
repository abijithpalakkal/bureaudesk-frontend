
import { AiFillClockCircle, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai'
import Homenavbar from './Homenavbar'
import { useState } from 'react'
import Adddepartmentmodal from '../modals/Adddepartmentmodal'
import Departmentcards from '../cards/Departmentcards'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BsFileArrowUp } from 'react-icons/bs'
import { ImArrowUp2 } from 'react-icons/im'
import Nearestcomponent from '../cards/Nearestcomponent'
import Activitystream from '../cards/Activitystream'

function Departments() {
  const [displaymodal, setdisplaymodal] = useState(false)
  const company = useSelector((state: RootState) => state.companydetails.company)
  const Authorization = useSelector((state: RootState) => state.userdetails.user.Authorization)
  function adddepartment() {
    if (Object.keys(company).length === 0) {
      alert("create your company first")
    }
    else {
      setdisplaymodal(true)
    }
  }
  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      {!displaymodal && <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>DEPARTMENTS</h1>
          {Authorization != "basic_node" && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span onClick={adddepartment}>add department</span> <span><AiOutlinePlus /></span></button>}
        </div>
        <div className='flex '>
          <div>
            <Departmentcards />
          </div>
          <div >
            <Nearestcomponent />
            <Activitystream/>
          </div>
        </div>
      </div>}
      {displaymodal && <div>
        <Adddepartmentmodal modalstatus={setdisplaymodal} />
        </div>}
    </div>
  )
}
export default Departments
