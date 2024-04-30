
import { AiOutlineCalendar } from "react-icons/ai"
import event from "../../assets/event image.png"
import { formatProdErrorMessage } from "@reduxjs/toolkit";
import birthday from "../../assets/eventbirthday.png"
import inaguaration from "../../assets/eventinaguration-removebg-preview.png"
import seminar from "../../assets/eventseminar.jpg"
import meeting from "../../assets/eventmeeting.jpg"


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

interface IEventProp {
    events: IEvents[]
}
interface IDateProp {
    year?: string
    month?: string
    day?: string
}
function Eventcard({ events }: IEventProp) {
    function date(timestamp: string | undefined) {
        if (!timestamp) {
            return ''; // or handle the undefined case as needed
        }

        const date = new Date(timestamp);
        const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate; // Output: "April 25, 2024"
    }

    return (
        <div className='w-full'>
            {events.map((obj: IEvents, index: number) => (<div className='flex bg-white rounded-lg items-center mt-3'>
                <div className='p-5 w-96'>
                    <div>
                        <div className='flex justify-start items-center gap-3 '>
                            <div className="w-16">
                            {obj.eventCategory=="Seminar" && <img src={seminar} alt="" />}
                            {obj.eventCategory=="others" && <img src={event} alt="" />}
                            {obj.eventCategory=="Inaguration" && <img src={inaguaration} alt="" />}
                            {obj.eventCategory=="Birthday" && <img src={birthday} alt="" />}
                            {obj.eventCategory==">Meeting" && <img  className="" src={meeting} alt="" />}
                            </div>
                            <div>
                                <p className='font-semibold'>{obj.eventName}</p>
                                <div className="flex justify-between items-center gap-32">
                                    <p className="font-semibold">{obj.eventDate}</p>
                                    <p className="font-semibold">{obj.eventTime}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className=' flex justify-center items-center'>
                            <img src="" alt="" />
                        </div>
                        <div className="flex justify-between items-end">
                            <p className='flex items-center mt-4 gap-3 text-slate-500'>
                                <AiOutlineCalendar />

                                <span>created {date(obj?.createdAt)}</span></p>
                            <p className="text-green-600 font-bold">{obj?.priority}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center p-5 border-l-2 border-slate-400'>
                    <p>{obj.eventDescription}</p>
                </div>
            </div>))}
        </div>
    )
}

export default Eventcard
