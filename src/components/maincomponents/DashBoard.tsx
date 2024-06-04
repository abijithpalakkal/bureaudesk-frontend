import React from 'react'
import Homenavbar from './Homenavbar'
import Departmentcards from '../cards/Departmentcards'
import Nearestcomponent from '../cards/Nearestcomponent'
import Activitystream from '../cards/Activitystream'
import Performancecard from '../cards/Performancecard'

const DashBoard = () => {
    console.log("hello home")
  return (
    <div className='w-5/6 h-screen px-2 py-2'>
      <div>
        <Homenavbar />
        <div className='flex justify-between mt-11'>
          <h1 className='font-bold text-3xl'>HOME</h1>
          {/* {Authorization !== "basic_node" && Authorization !== "semi_node" &&<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span onClick={adddepartment}>add department</span> <span><AiOutlinePlus /></span></button>} */}
        </div>
        <div className='flex '>
          <div className='w-full'>
            <Performancecard/>
          </div>
          <div >
            <Nearestcomponent val={""} />
            <Activitystream/>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default DashBoard
