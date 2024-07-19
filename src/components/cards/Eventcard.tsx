
import { AiOutlineCalendar, AiOutlineDelete } from "react-icons/ai"
import event from "../../assets/event image.png"
import { formatProdErrorMessage } from "@reduxjs/toolkit";
import birthday from "../../assets/eventbirthday.png"
import inaguaration from "../../assets/eventinaguration-removebg-preview.png"
import seminar from "../../assets/eventseminar.jpg"
import meeting from "../../assets/eventmeeting.jpg"
import editicon from "../../assets/edit icon.png"
import { boolean } from "yup";
import { useState } from "react";
import Editeventsmodal from "../modals/Editeventsmodal";
import Eventclosemodal from "../modals/Eventclosemodal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


interface IEvents {
    _id?: string;
    eventName?: string;
    eventCategory?: string;
    priority?: string;
    eventDate?: string;
    eventEndDate?: string;
    eventEndTime?: string;
    eventTime?: string;
    eventDescription?: string;
    companyid?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

interface IEventProp {
    events?: IEvents[]
    refresh?: any
    val?: Boolean
}
interface IDateProp {
    year?: string
    month?: string
    day?: string
}
function Eventcard({ events, refresh, val }: IEventProp) {

    const [openmodal, setopenmodal] = useState<boolean>(false)
    const [id, setid] = useState<string>("")
    const [eventdeletemodal, seteventdeletemodal] = useState<Boolean>(false)
    const [eventId, setEventId] = useState<string>("")
    const userRole = useSelector((state: RootState) => state.userdetails.user.Authorization)

    function date(timestamp: string | undefined) {
        if (!timestamp) {
            return ''; // or handle the undefined case as needed
        }

        const date = new Date(timestamp);
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate; // Output: "April 25, 2024"
    }

    const openEditModal = (id: string) => {
        setopenmodal(true)
        setid(id)
    }

    return (
        <div className='w-full'>
            {events?.map((obj: IEvents, index: number) => (<div className='flex bg-white rounded-lg  mt-3'>
                <div className='p-5 w-96'>
                    <div>
                        <div className='flex justify-start items-center gap-3 '>
                            <div className="w-16">
                                {obj.eventCategory == "Seminar" && <img src={seminar} alt="" />}
                                {obj.eventCategory == "others" && <img src={event} alt="" />}
                                {obj.eventCategory == "Inaguration" && <img src={inaguaration} alt="" />}
                                {obj.eventCategory == "Birthday" && <img src={birthday} alt="" />}
                                {obj.eventCategory == ">Meeting" && <img className="" src={meeting} alt="" />}
                            </div>
                            <div>
                                <p className='font-semibold'>{obj.eventName}</p>
                                <div className="flex justify-between items-center gap-32 ">
                                    <p className="font-semibold w-28">{obj.eventDate}</p>
                                    <p className="font-semibold">{obj.eventTime}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>

                        <div className=' flex justify-center items-center'>
                            <img src="" alt="" />
                        </div>
                        <p className='flex items-center mt-4 gap-3 text-slate-500'>
                            <AiOutlineCalendar />

                            <span>End Date {date(obj?.eventEndDate )} ,</span>
                            <span>End Time {obj?.eventEndTime}</span>
                            </p>
                        <div className="flex justify-between items-end">

                            <p className='flex items-center mt-4 gap-3 text-slate-500'>
                                <AiOutlineCalendar />

                                <span>created {date(obj?.createdAt)}</span></p>
                            <p className="text-green-600 font-bold">{obj?.priority}</p>
                        </div>
                    </div>
                </div>
                <div className='p-2 border-l-2 border-slate-400 w-full'>

                    <div className="flex justify-between items-center">
                        <div></div>
                        {userRole == "root_node" && <div className="flex justify-center items-center gap-3">
                            <img src={editicon} alt="" className="cursor-pointer" onClick={() => { openEditModal(obj._id as string) }} />

                            <AiOutlineDelete className="w-6 h-6  hover:text-red-500 duration-75" onClick={() => { setEventId(obj._id as string); seteventdeletemodal(true) }} />
                        </div>}

                    </div>
                    <p className="font-semibold">Description:</p>
                    <p className="text-slate-600">{obj.eventDescription}</p>
                </div>
            </div>))}
            {eventdeletemodal && <Eventclosemodal closemodal={seteventdeletemodal} refresh={refresh} val={val} id={eventId} />}
            {openmodal && <Editeventsmodal closemodal={setopenmodal} id={id} refresh={refresh} val={val} />}
        </div>

    )
}

export default Eventcard
