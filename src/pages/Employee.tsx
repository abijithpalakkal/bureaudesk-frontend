import React from 'react'
import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai'
import { BiCalendarEvent } from 'react-icons/bi'
import { BsListTask, BsPersonSquare } from 'react-icons/bs'
import { FcDepartment } from 'react-icons/fc'
import { GrNotification } from 'react-icons/gr'
import { RiDashboardLine } from 'react-icons/ri'
import { SiMessenger } from 'react-icons/si'
import logo from '../assets/logo_2-removebg-preview (4).png'

function Employee() {
    return (
        <div className='bg-slate-100 h-screen flex'>
            <div className='py-2 px-3 w-1/6 h-full'>
                <div className='bg-white h-full w-full rounded-3xl flex flex-col py-2 px-2 justify-between'>
                    <div className='flex flex-col'>
                        <div className='w-[100px] h-[100px] bg-black self-center'></div>
                        <div className='mt-5 flex flex-col gap-5'>
                            <div className='flex items-center gap-2 text-slate-500 cursor-pointer'><RiDashboardLine /><p>dashboard</p></div>
                            <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BsListTask /><p>project</p></div>
                            <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BiCalendarEvent /><p>events</p></div>
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'> <div className='flex items-center gap-2 text-blue-500 font-bold'> <FcDepartment /><p>department</p></div></div>
                            <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <SiMessenger /><p>messages</p></div>
                            <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BsPersonSquare /><p>profile</p></div>
                        </div>
                    </div>
                    <div className='w-[125px] self-center'>
                        <img src={logo} alt="" className='w-full' />
                        <div className='h-8'><p className='text-[11px] text-center'>Create.plan.control</p></div>
                    </div>
                </div>
            </div>
            <div className='w-5/6 h-screen px-2 py-2'>
                <div>
                    <div className='flex justify-between'>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="rounded-md w-72 h-8 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M9 3a6 6 0 100 12 6 6 0 000-12zM0 9a9 9 0 1118 0A9 9 0 010 9zm17.707 6.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 111.414-1.414l4 4z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div className='bg-white w-8 h-8 flex justify-center items-center rounded-md'><GrNotification /></div>
                            <div className='bg-white flex px-2 gap-2 justify-around items-center rounded-md'>
                                <BsPersonSquare />
                                <p>john dow</p>
                                <AiOutlineDown />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-11'>
                        <h1 className='font-bold text-3xl'>employees(28)</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded add employees flex justify-center items-center gap-2"><span>add department</span> <span><AiOutlinePlus /></span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee
