import { BiCalendarEvent } from 'react-icons/bi'
import { BsListTask, BsPersonSquare } from 'react-icons/bs'
import { FcDepartment } from 'react-icons/fc'
import { RiDashboardLine } from 'react-icons/ri'
import { SiMessenger } from 'react-icons/si'
import logo from '../assets/logo_2-removebg-preview (4).png'
import { ImOffice } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

interface HomesidebarProps {
    page: string;
}

function Homesidebar(props: HomesidebarProps) {
   const comapanyimage= useSelector((state:RootState)=>state.companydetails.company.Companylogo)
    const navigate=useNavigate()
    return (
        <div className='py-2 px-3 w-1/6 h-full'>
            <div className='bg-white h-full w-full rounded-3xl flex flex-col py-2 px-2 justify-between'>
                <div className='flex flex-col'>
                    { comapanyimage && <div className='w-[100px] h-[100px self-center'><img src={comapanyimage} alt="" /></div>}
                    <div className='mt-5 flex flex-col gap-5'>
                        <div className='flex items-center gap-2 text-slate-500 cursor-pointer'><RiDashboardLine /><p>dashboard</p></div>
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BsListTask /><p>project</p></div>
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BiCalendarEvent /><p>events</p></div>
                        {props.page === 'department' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <FcDepartment />
                                    <p>department</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer' onClick={()=>navigate("/employees")}>  <FcDepartment /><p>department</p></div>)}
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <SiMessenger /><p>messages</p></div>
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer'> <BsPersonSquare /><p>profile</p></div>
                        {props.page === 'company' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <ImOffice />
                                    <p>company</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer'onClick={()=>navigate("/company")}>  <ImOffice /> <p>company</p></div>)}

                    </div>
                </div>

                <div className='w-[125px] self-center'>
                    <img src={logo} alt="" className='w-full' />
                    <div className='h-8'><p className='text-[11px] text-center'>Create.plan.control</p></div>
                </div>
            </div>
        </div>
    )
}

export default Homesidebar
