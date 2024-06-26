import { useEffect, useState } from 'react'
import { AiFillClockCircle, AiOutlineRight } from 'react-icons/ai'
import { ImArrowUp2 } from 'react-icons/im'
import fetchData from '../../utils/fetchdata'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { string } from 'yup'
import postData from '@/utils/postdata'
import duumyimage from "../../assets/no-event-bg.png"


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

interface iprop {
  val: any
}

function Nearestcomponent({ val }: iprop) {
  const companyid = useSelector((state: RootState) => state.companydetails.company._id)
  const [events, setevents] = useState<IEvents[]>([])
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await postData(`/company/getevent`, { companyid: companyid })
        console.log(data.data)
        console.log("jacob swarg")

        data.data.sort((a: IEvents, b: IEvents) => {
          const datetimeA: any = new Date(`${a.eventDate}T${a.eventTime}`);
          const datetimeB: any = new Date(`${b.eventDate}T${b.eventTime}`);
          return datetimeA - datetimeB;
        });
        setevents(data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getEvents()
  }, [companyid, val])


  function convertTo12HourTime(militaryTime: string) {

    const timeParts = militaryTime.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours12}:${paddedMinutes} ${period}`;
  }

  const currentDatetime: Date = new Date();
  function leftTime(event: IEvents) {
    const eventDatetime: Date = new Date(`${event.eventDate}T${event.eventTime}`);
    const timeDifference: number = eventDatetime.getTime() - currentDatetime.getTime();
    const hoursLeft: number = Math.floor(timeDifference / (1000 * 60 * 60));
    console.log(`Hours left for event "${event.eventName}": ${hoursLeft}`);
    return hoursLeft
  };

  function getDayOfWeek(date: string) {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const selectedDate = new Date(date);

    if (selectedDate.toDateString() === today.toDateString()) {
      return 'today';
    } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
      return 'tomorrow';
    } else {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[selectedDate.getDay()];
    }
  }

  function getBorderColor(category: string) {
    console.log(category, "👌👌")
    if (category === "others") {
      return "border-blue-500";
    }
    if (category === ">Meeting") {
      return "border-green-500";
    }
    if (category === "Seminar") {
      return "border-yellow-500";
    }
    if (category === "Inaguration") {
      return "border-orange-500";
    }
    if (category === "Birthday") {
      return "border-pink-500";
    }

    return "border-blue-500";
  }

  function getFontSize(obj: any) {
    return obj.eventTime.length > 10 ? 'text-sm' : 'text-base';
  }

  return (
    <div className='w-64 rounded-xl bg-white p-3 mt-5 h-72 overflow-hidden'>
      <div className='flex  items-center justify-between mb-4'>
        <p className='text-xl font-semibold'>Nearest Events</p>
        <p className='text-blue-500 font-nunitosans flex justify-between items-center'><span>view all</span> <AiOutlineRight /></p>
      </div>

      {events.length > 0 ? (
        events.map((obj, index) => (
          <div key={index} className={`border-l-2 ${getBorderColor(obj.eventCategory as string)} px-2 mt-5`}>
            <div className='flex justify-between mt-5'>
              <p className='font-nunitosans font-semibold'>{obj.eventName}</p>
              <p className='text-green-500'><ImArrowUp2 /></p>
            </div>
            <div className='flex justify-between items-center mt-3 '>
              <p className='text-slate-500 truncate'>
                <span className='mr-1'>{getDayOfWeek(obj.eventDate as string)}</span>
                <span className='mr-1'>|</span>
                <span className={`mr-1 ${getFontSize(obj)}`}>{convertTo12HourTime(obj?.eventTime as string)}</span>
              </p>
              <div className='bg-blue-100 rounded-md text-slate-600'>
                <p className='flex justify-between px-2  items-center'>
                  <span className='mr-1'><AiFillClockCircle /></span>
                  {leftTime(obj)}
                  <span>h</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full opacity-55 ">
          <img src={duumyimage} alt="No events available" className="mb-5" />
        </div>
      )}
    </div>
  )
}

export default Nearestcomponent
