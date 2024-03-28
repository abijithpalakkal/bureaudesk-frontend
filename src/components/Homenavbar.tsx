import React from 'react'
import { BiCalendarEvent } from 'react-icons/bi'
import { GrNotification } from 'react-icons/gr'
import { BsListTask, BsPersonSquare } from 'react-icons/bs'
import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai'

function Homenavbar() {
    return (
        <div className='flex justify-between'>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="rounded-md w-72 h-8 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 3a6 6 0 100 12 6 6 0 000-12zM0 9a9 9 0 1118 0A9 9 0 010 9zm17.707 6.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 111.414-1.414l4 4z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='bg-white w-8 h-8 flex justify-center items-center rounded-md'><GrNotification /></div>
                <div className='bg-white flex px-2 gap-2 justify-around items-center rounded-md'>
                    <BsPersonSquare />
                    <p>john dow</p>
                    <AiOutlineDown />
                </div>
            </div>
        </div>
    )
}

export default Homenavbar
