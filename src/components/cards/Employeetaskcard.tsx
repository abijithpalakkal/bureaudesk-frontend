import React, { useEffect } from 'react'
import progress from "../../assets/progress.png"
import fetchData from '@/utils/fetchdata'

interface IPropData {
    data: any[]
}

const Employeetaskcard = ({ data }: IPropData) => {

    console.log(data, 789)
    return (
        <div className='w-full px-7 py-3'>
            {data.map((item, index) => (
                <div className='flex justify-around items-center bg-white p-3 rounded-xl ml-2 mb-2 hover:border-blue-500 border-2  duration-75 shadow-lg ' key={index}>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm'>Task Name</p>
                        <p>{item.taskName}</p>
                    </div>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm'>Estimate</p>
                        <p>{item.estimate}</p>
                    </div>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm'>DeadLine</p>
                        <p>{item.deadLine}</p>
                    </div>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1'>Assigneeby</p>
                        <div className='flex justify-between gap-1 items-center'>

                            {item.assignedBy.data.profileImage && <img src={item.assignedBy.data.profileImage} alt="" className='w-6 h-6 rounded-full' />}


                            <p>{item.assignedBy.data.Name ? item.assignedBy.data.Name : item.assignedBy.data.Email}</p>
                        </div>

                    </div>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm mb-1'>AssigneeTo</p>
                        <div className='flex justify-between gap-1 items-center'>

                            {item.assignedTo.data.profileImage && <img src={item.assignedTo.data.profileImage} alt="" className='w-6 h-6 rounded-full' />}


                            <p>{item.assignedTo.data.Name ? item.assignedTo.data.Name : item.assignedTo.data.Email}</p>
                        </div>

                    </div>
                    <div>
                        <p className='text-slate-500 font-nunitosans text-sm'>Priority</p>
                        <p>{item.priority}</p>
                    </div>
                    <div>
                        <p>done</p>
                    </div>
                    <div className=''>
                        <img src={progress} alt="" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Employeetaskcard
