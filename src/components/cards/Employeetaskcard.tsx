import React, { useEffect } from 'react'
import progress from "../../assets/progress.png"
import fetchData from '@/utils/fetchdata'
import dummy from "../../assets/dummy-profile-pic-300x300-1.png"
import Muidropdownfortask from '../dropdown/Muidropdownfortask'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

interface IPropData {
    data: any[]
    assigned: string
}

const Employeetaskcard = ({ data, assigned }: IPropData) => {

    console.log(data, 789)
    return (
        <div className='w-full px-7 py-3'>
            {data.map((item, index) => (
                <div className='flex justify-around items-center bg-white p-3 rounded-xl ml-2 mb-2 hover:border-blue-500 border-2  duration-75 shadow-lg ' key={index}>
                    <div className='w-32'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Task Name</p>
                        <p className='font-medium'>{item.taskName}</p>
                    </div>
                    <div className='w-14'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Estimate</p>
                        <p className='font-medium'>{item.estimate}</p>
                    </div>
                    <div className='w-24'>
                        <p className='text-slate-500 font-nunitosans text-sm'>DeadLine</p>
                        <p className='font-medium'>{item.deadLine}</p>
                    </div>
                    {(assigned === "all" || assigned === "toYou") && <div className='w-24'>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1'>Assignedby</p>
                        <div className='flex justify-start gap-2 items-center'>

                            {item.assignedBy.data.profileImage && <img src={item.assignedBy.data.profileImage} alt="" className='w-6 h-6 rounded-full' />}
                            {!item.assignedBy.data.profileImage && <img src={dummy} alt="" className='w-6 h-6 rounded-full' />}


                            <p className='text-sm font-medium'>
                                {item.assignedBy.data.Name
                                    ? (item.assignedBy.data.Name.length > 14 ? item.assignedBy.data.Name.slice(0, 14) + '...' : item.assignedBy.data.Name)
                                    : (item.assignedBy.data.email.length > 14 ? item.assignedBy.data.email.slice(0, 14) + '...' : item.assignedBy.data.email)
                                }
                            </p>
                        </div>

                    </div>}
                    <div className='w-40'>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1'>AssignedTo</p>
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
                    <div className='w-16'>
                        <p className='text-slate-500 font-nunitosans text-sm'>Priority</p>
                        {item.priority == "medium" && <div className='flex justify-start items-center text-yellow-500 gap-1'>
                            <div className='font-semibold '><BsArrowUp /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                        {item.priority == "high" && <div className='flex justify-start items-center text-red-500 gap-1'>
                            <div className='font-semibold '><BsArrowUp /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                        { item.priority == "low" && <div className='flex justify-start items-center text-green-500 gap-1'>
                            <div className='font-semibold '><BsArrowDown /></div>
                            <p className='font-medium '>{item.priority}</p>
                        </div>}
                    </div>
                    {assigned === "toYou" && <div>
                        <Muidropdownfortask />
                    </div>}
                    {(assigned === "all" || assigned === "byYou") && <div className='w-24'>
                        <div className='bg-green-100 px-3 py-1 text-center rounded-lg'>
                        <p className='font-medium text-green-500'>Assigned</p>
                        </div>
                       
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
