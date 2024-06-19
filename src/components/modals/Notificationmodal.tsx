import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import logo from "../../assets/logo_without_writing-removebg-preview.png"


const Notificationmodal = () => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen h-screen">
        <div className="inset-0 bg-black opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-12 absolute">
            <div className='flex justify-between'>
                <div className='w-12 '>
                    <img src={logo} alt="" />
                </div>
                <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center  hover:bg-blue-500  duration-500'><AiOutlineClose /></div>
            </div>
           
        </div>
    </div>
</div>
  )
}

export default Notificationmodal
