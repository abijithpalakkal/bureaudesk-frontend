import React, { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlineCalendar, AiOutlinePlus } from 'react-icons/ai'
import Addeventmodal from '../modals/Addeventmodal'
import Eventcard from '../cards/Eventcard'
import fetchData from '../../utils/fetchdata'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

interface IEvents {
    id: number;
    name: string;
    date: string;
}

function Events() {
    const companyid = useSelector((state: RootState) => state.companydetails.company._id)
    const[events,setevents]=useState<IEvents[]>([])
    useEffect(() => {
        const getEvents = async () => {
            try{
                const data= await fetchData(`/company/getevent/${companyid}`)
                
            }catch(err){

            }
          

        }
    })

    const [displaymodal, setdisplaymodal] = useState<boolean>(false)
    return (
        <div className='w-5/6 h-screen px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>EVENTS</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { setdisplaymodal(true) }}><span >add events</span> <span><AiOutlinePlus /></span></button>
                </div>
                <Eventcard />
                {displaymodal && <Addeventmodal closemodal={setdisplaymodal} />}

            </div>

        </div>
    )
}

export default Events
