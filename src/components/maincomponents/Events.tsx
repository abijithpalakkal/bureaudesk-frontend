import { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlinePlus } from 'react-icons/ai'
import Addeventmodal from '../modals/Addeventmodal'
import Eventcard from '../cards/Eventcard'
import fetchData from '../../utils/fetchdata'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Nearestcomponent from '../cards/Nearestcomponent'
import Activitystream from '../cards/Activitystream'
import postData from '@/utils/postdata'

interface IEvents {
    _id?: string;
    eventName?: string;
    eventCategory?: string;
    priority?: string;
    eventDate?: string;
    eventTime?: string;
    eventDescription?: string;
    companyid?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

function Events() {
    const companyid = useSelector((state: RootState) => state.companydetails.company._id)
    const role = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const [events, setevents] = useState<IEvents[]>([])
    const [refresh,setrefresh]=useState<boolean>(false)
    useEffect(() => {
        const getEvents = async () => {
            try {
                const data = await postData("/company/getevent",{companyid: companyid })
                setevents(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getEvents()
    }, [companyid, role,refresh])

    const [displaymodal, setdisplaymodal] = useState<boolean>(false)
    return (
        <div className='w-5/6 px-2 py-2'>
            <div>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>EVENTS</h1>
                    {role == "root_node" && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2" onClick={() => { setdisplaymodal(true) }}><span >add events</span> <span><AiOutlinePlus /></span></button>}
                </div>
                <div className='flex justify-between '>
                    <div className='w-full mr-5 '>
                        <Eventcard events={events as IEvents[]} refresh={setrefresh} val={refresh}/>
                    </div>

                    <div className=''>
                        <Nearestcomponent val={refresh}/>
                        <Activitystream />
                    </div>
                </div>
                {displaymodal && <Addeventmodal closemodal={setdisplaymodal} refresh={setrefresh} val={refresh}/>}
                

            </div>

        </div>
    )
}

export default Events
