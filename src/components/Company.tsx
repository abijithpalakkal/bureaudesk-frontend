import React, { useState } from 'react'
import Homenavbar from './Homenavbar'
import { ImCross } from 'react-icons/im'
import Createcompanymodal from './modals/Createcompanymodal'
import { UseSelector, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

function Company() {
    
    const [modaldisplay, setmodaldisplay] = useState(false)
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div className='h-full'>
                <Homenavbar />
                <div className='h-4/5 w-full flex justify-center items-center'>
                    <div className='flex flex-col '>
                        <ImCross className='text-red-700 text-3xl self-center mb-3' />
                        <p className='text-center mb-4 text-2xl font-bold'>company not created!</p>
                        <button className="bg-blue-500 w-[200px] flex items-center justify-center self-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={() => { setmodaldisplay(true) }}>
                            <span >Create company</span>
                        </button>
                    </div>
                </div>
            </div>
            {modaldisplay && <Createcompanymodal modalstatus={setmodaldisplay}/>}
        </div>

    )
}

export default Company
