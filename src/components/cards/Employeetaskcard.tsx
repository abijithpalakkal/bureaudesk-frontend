import React, { useEffect, useState } from 'react'
import progress from "../../assets/progress.png"
import fetchData from '@/utils/fetchdata'
import dummy from "../../assets/dummy-profile-pic-300x300-1.png"
import Muidropdownfortask from '../dropdown/Muidropdownfortask'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'
import { boolean } from 'yup'

interface IPropData {
    data?: any
    assigned?: string
    refresh?: boolean
    setrefresh?: any
    getTaskInfo?:any
}

const Employeetaskcard = ({ data, assigned, refresh, setrefresh,getTaskInfo}: IPropData) => {
    const [selector, setSelector] = useState("")
    console.log(selector)

    useEffect(()=>{
        setSelector(data[0]?._id)
    },[data])

    return (
        <div className='w-full pr-3 py-3'>
            {data.map((item:any, index:any) => (
                <div
                    key={index}
                    className={`flex justify-around items-center bg-white p-3 px-1 rounded-xl mb-2 border-2 duration-75 shadow-lg ${selector === item._id ? 'border-blue-500' : 'border-transparent'}`}
                    onClick={() => {
                        setSelector(item._id)
                        getTaskInfo(item)
                    }
                    }>
                    <div className='w-32'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Task Name</p>
                        <p className='font-medium  text-sm'>{item.taskName}</p>
                    </div>
                    <div className='w-14'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Estimate</p>
                        <p className='font-medium text-sm'>{item.estimate}</p>
                    </div>
                    <div className='w-24'>
                        <p className='text-slate-500 font-nunitosans text-sm'>DeadLine</p>
                        <p className='font-medium  text-sm'>{item.deadLine}</p>
                    </div>
                    {(assigned === "all" || assigned === "toYou") && <div className='w-36'>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1 text-center'>Assignedby</p>
                        <div className='flex justify-center items-center'>
                            <div className='flex justify-start gap-2 items-center '>

                                {item.assignedBy.data.profileImage && <img src={item.assignedBy.data.profileImage} alt="" className='w-6 h-6 rounded-full' />}
                                {!item.assignedBy.data.profileImage && <img src={dummy} alt="" className='w-6 h-6 rounded-full' />}


                                <p className='text-sm font-medium '>
                                    {item.assignedBy.data.Name
                                        ? (item.assignedBy.data.Name.length > 14 ? item.assignedBy.data.Name.slice(0, 14) + '...' : item.assignedBy.data.Name)
                                        : (item.assignedBy.data.email.length > 14 ? item.assignedBy.data.email.slice(0, 14) + '...' : item.assignedBy.data.email)
                                    }
                                </p>
                            </div>
                        </div>

                    </div>}
                    <div className='w-36'>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1 text-center'>AssignedTo</p>
                        <div className='flex justify-center items-center'>
                            <div className='flex justify-start gap-1 items-center'>

                                {item.assignedTo.data.profileImage && <img src={item.assignedTo.data.profileImage} alt="" className='w-6 h-6 rounded-full' />}
                                {!item.assignedTo.data.profileImage && <img src={dummy} alt="" className='w-6 h-6 rounded-full' />}


                                <p className='text-sm font-medium'>
                                    {item.assignedTo.data.Name
                                        ? (item.assignedTo.data.Name.length > 14 ? item.assignedTo.data.Name.slice(0, 14) + '...' : item.assignedTo.data.Name)
                                        : (item.assignedTo.data.email.length > 14 ? item.assignedTo.data.email.slice(0, 14) + '...' : item.assignedTo.data.email)
                                    }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='w-20 text-sm '>
                        <p className='text-slate-500 font-nunitosans'>Priority</p>
                        {item.priority == "medium" && <div className='flex justify-start items-center text-yellow-500 gap-1'>
                            <div className='font-semibold '><BsArrowUp /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                        {item.priority == "high" && <div className='flex justify-start items-center text-red-500 gap-1'>
                            <div className='font-semibold '><BsArrowUp /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                        {item.priority == "low" && <div className='flex justify-start items-center text-green-500 gap-1'>
                            <div className='font-semibold '><BsArrowDown /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                    </div>
                    {assigned === "toYou" && <div className='w-28 flex justify-center items-center'>
                        <Muidropdownfortask defaults={item.status} id={item._id} refresh={refresh} setrefresh={setrefresh} />
                    </div>}
                    {(assigned === "all" || assigned === "byYou") && <div className='w-20'>
                        {item.status == "Assigned" && <div className=' px-2 py-1 text-center rounded-lg border'>
                            <p className='font-medium text-green-500 text-sm'>{item.status}</p>
                        </div>}
                        {item.status == "Started" && <div className='bg-slate-100 px-2 py-1 text-center rounded-lg'>
                            <p className='font-medium text-slate-500 text-sm'>{item.status}</p>
                        </div>}
                        {item.status == "in-Progress" && <div className='bg-blue-100 px-2 py-1 text-center rounded-lg'>
                            <p className='font-medium text-blue-500 text-sm'>{item.status}</p>
                        </div>}
                        {item.status == "Done" && <div className='bg-green-100 px-2 py-1 text-center rounded-lg'>
                            <p className='font-medium text-green-500 text-sm'>{item.status}</p>
                        </div>}

                    </div>}
                    <div className=''>
                        <img src={progress} alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Employeetaskcard
