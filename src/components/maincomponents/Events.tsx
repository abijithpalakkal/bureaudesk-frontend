import React from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlinePlus } from 'react-icons/ai'

function Events() {
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>EVENTS</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span >add events</span> <span><AiOutlinePlus /></span></button>
                </div>
                
            </div>

        </div>
    )
}

export default Events
