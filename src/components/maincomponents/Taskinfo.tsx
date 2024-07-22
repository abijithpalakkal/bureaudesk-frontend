import Cardskeleton from '../skeleton/Cardskeleton'
import { useState } from 'react'
import addfile from "../../assets/Add Attachments.png"
import progress from "../../assets/progress.png"
import { AiFillCalendar } from 'react-icons/ai'
import editicon from "../../assets/edit icon.png"
import Edittaskmodal from '../modals/Edittaskmodal'
import { useNavigate } from 'react-router-dom'

interface Task {
    deadLine: string;
    estimate: string;
}


const Taskinfo = ({ taskInfo }: {

    taskInfo: any

}) => {

    const [displayModal, setDisplayModal] = useState(false)
    const navigate=useNavigate()


    function getFileNameFromUrl(url: string) {
        if (url || url == "") {
            const parts = url.split('/');
            return parts[parts.length - 1];
        }

    }
    function formatDateString(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    

    function formatDateString2(dateString: any) {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    function calculateTimeLeft(task: Task): string {
        const { deadLine, estimate } = task;
        const deadlineDate = new Date(deadLine);
        const [estimateHours, estimateMinutes] = estimate.split(':').map(Number);
        const estimatedDate = new Date(deadlineDate);
        estimatedDate.setHours(estimatedDate.getHours() + estimateHours);
        estimatedDate.setMinutes(estimatedDate.getMinutes() + estimateMinutes);
        const now = new Date();

        if (now > estimatedDate) {

            return "The time is expired";
        }

        return `${formatTimeDifference(now, estimatedDate)} left`;
    }

    function formatTimeDifference(startDate: Date, endDate: Date): string {
        let delta = Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        const minutes = Math.floor(delta / 60) % 60;

        const daysStr = days > 0 ? `${days}d ` : '';
        const hoursStr = hours > 0 ? `${hours}h ` : '';
        const minutesStr = minutes > 0 ? `${minutes}m` : '';


        return `${daysStr}${hoursStr}${minutesStr}`.trim();

    }
    return (
        <>

            {!taskInfo && <Cardskeleton />}
            {taskInfo && <>
                <div className=' flex justify-between items-center' >
                    <p className='font-bold '>Task Info</p>
                    <img src={editicon} alt="" className=' w-5 hover:w-6 duration-150' onClick={() => { setDisplayModal(true) }} />
                </div>

                <p className='font-medium mt-1 text-sm'>description:</p>
                <p className='text-sm'>{taskInfo?.taskDescription}</p>
                <p className='mt-1 font-medium text-sm'>task Attachments:</p>
                <div className='flex justify-start items-center mt-1 '>
                    <a
                        href={taskInfo?.files[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-36 h-28 rounded-xl relative overflow-hidden block'
                    >
                        <div className='w-36 h-28 rounded-xl relative overflow-hidden '>
                            <div className='flex justify-between absolute w-full'>
                                <div>

                                </div>
                                <img src={addfile} alt="" className='w-8 ' />
                            </div>
                            <iframe
                                src={taskInfo?.files[0]}
                                className="w-48 overflow-hidden h-full"
                                title="PDF"
                            ></iframe>

                            <div className='absolute w-full bg-white top-16 h-12 p-2 rounded-t-2xl border text-sm'>
                                {getFileNameFromUrl(taskInfo?.files[0])}
                            </div>
                        </div>
                    </a>
                </div>
                {calculateTimeLeft({ deadLine: taskInfo?.deadLine, estimate: taskInfo?.estimate }) == "The time is expired" ? (<div className='w-full h-28 mt-3 rounded-2xl p-3 bg-red-100 '>
                    <p className='font-medium'>Time Tracking</p>
                    <div className='flex gap-4'>
                        <div className='flex justify-center items-center'> <img src={progress} alt="" /></div>

                        <div>
                            <p className='mt-2'><span>{calculateTimeLeft({ deadLine: taskInfo?.deadLine, estimate: taskInfo?.estimate })}</span></p>
                            <p className='text-slate-500'><span>{taskInfo.priority}</span> priority</p>
                        </div>
                    </div>
                </div>) : (
                    <div className='w-full h-28 mt-3 rounded-2xl p-3 bg-blue-100 '>
                        <p className='font-medium'>Time Tracking</p>
                        <div className='flex gap-4'>
                            <div className='flex justify-center items-center'> <img src={progress} alt="" /></div>

                            <div>
                                <p className='mt-2'><span>{calculateTimeLeft({ deadLine: taskInfo?.deadLine, estimate: taskInfo?.estimate })}</span></p>
                                <p className='text-slate-500'><span>{taskInfo.priority}</span> priority</p>
                            </div>
                        </div>


                    </div>
                )}
                <div className='flex items-center mt-2'>
                    <div className='w-10 h-0 border '></div>
                    <p className='text-sm text-slate-500'>DeadLine</p>
                    <div className='w-36 h-0 border'></div>
                </div>
                <p className='text-slate-500 text-sm mt-1'>{formatDateString2(taskInfo.deadLine)}</p>
                <p className='flex justify-start items-center text-slate-500 text-sm mt-5'> <p className='flex items-center'>
                    <AiFillCalendar /> <span>created at </span><span>{formatDateString(taskInfo.createdAt)}</span>
                </p></p>
                <div className='flex justify-center items-center'>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold mt-3 py-1 px-2 rounded add employees flex justify-center items-center gap-2" onClick={() => { navigate(`/projects/taskdetails/${taskInfo._id}`) }}><span className='text-sm' >more details</span></button>

                </div>

            </>}
            {displayModal && <Edittaskmodal displayModal={displayModal} setDisplayModal={setDisplayModal} taskInfo={taskInfo} />}

        </>
    )
}

export default Taskinfo
