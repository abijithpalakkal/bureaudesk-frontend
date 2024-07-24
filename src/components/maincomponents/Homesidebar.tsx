import { BiCalendarEvent, BiLogOut } from 'react-icons/bi'
import { BsListTask, BsPersonSquare } from 'react-icons/bs'
import { FcDepartment } from 'react-icons/fc'
import { RiDashboardLine } from 'react-icons/ri'
import { SiMessenger } from 'react-icons/si'
import logo from '../../assets/logo_2-removebg-preview (4).png'
import { ImOffice } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import support from "../../assets/Support.png"
import { userdetailslogout } from '../../redux/slices/userreducer/userReducer'
import { usercompanylogout } from '../../redux/slices/companyreducer/companyReducer'
import fetchData from '../../utils/fetchdata'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useSocketContext } from "../../context/SocketContext";
import { useEffect } from 'react'
import { HomesidebarProps } from '@/interface/homesidebar'






function Homesidebar(props: HomesidebarProps) {

    useEffect(() => {
        return () => {
            console.log("sidebar Unmounted")
        }
    }, [])
    const dispatch = useDispatch<AppDispatch>()
    const company = useSelector((state: RootState) => state.companydetails.company)
    const { socket } = useSocketContext()
    const user = useSelector((state: any) => state.userdetails.user._id)

    const handleLogoutClick = async () => {
         await fetchData("/auth/logout")
        socket.emit("disconnec", user)
        socket.close()
        dispatch(userdetailslogout())
        dispatch(usercompanylogout())
        navigate("/")

    }

    const isEmpty = (obj: any) => JSON.stringify(obj) === '{}'
    const navigate = useNavigate()
    return (
        <div className='py-2 px-3 w-1/6 h-screen sticky top-0'>
            <div className='h-full w-full rounded-3xl flex flex-col py-2 px-2 justify-between shadow-2xl bg-white  '>
                <div className='flex flex-col'>
                    <div className='w-28 self-center'>
                        <img src={logo} alt="" className='w-full' />
                        {/*<div className='h-2'><p className='text-[11px] text-center'>Create.plan.control</p></div>*/}
                    </div>
                    <div className='mt-5 flex flex-col gap-5'>
                        {props.page === 'profile' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <BsPersonSquare />
                                    <p>Profile</p>
                                </div>
                            </div>
                        ) : <div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/viewprofile")}> <BsPersonSquare /><p>Profile</p></div>}





                        {
                            props.page === 'dashboard' ? (
                                <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                    <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                        <RiDashboardLine />
                                        <p>Home</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex items-center gap-2 cursor-pointer duration-300 ${!isEmpty(company) ? 'text-slate-500 hover:ml-4' : 'text-slate-100'}`}
                                    onClick={!isEmpty(company) ? () => navigate("/dashboard") : undefined}
                                >
                                    <RiDashboardLine />
                                    <p>Home</p>
                                </div>
                            )
                        }





                        {
                            props.page === "projects" ? (
                                <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500 duration-1000'>
                                    <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                        <BsListTask />
                                        <p>Projects</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex items-center gap-2 cursor-pointer duration-300 ${!isEmpty(company) ? 'text-slate-500 hover:ml-4' : 'text-slate-100'}`}
                                    onClick={!isEmpty(company) ? () => navigate("/projects") : undefined}
                                >
                                    <BsListTask />
                                    <p>Projects</p>
                                </div>
                            )
                        }



                        {
                            props.page === "events" ? (
                                <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500 duration-1000'>
                                    <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                        <BiCalendarEvent />
                                        <p>Events</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex items-center gap-2 cursor-pointer duration-300 ${!isEmpty(company) ? 'text-slate-500 hover:ml-4' : 'text-slate-100'}`}
                                    onClick={!isEmpty(company) ? () => navigate("/events") : undefined}
                                >
                                    <BiCalendarEvent />
                                    <p>Events</p>
                                </div>
                            )
                        }



                        {
                            props.page === 'department' ? (
                                <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500 transition-transform duration-1000'>
                                    <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                        <FcDepartment />
                                        <p>Department</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex items-center gap-2 cursor-pointer duration-300 ${!isEmpty(company) ? 'text-slate-500 hover:ml-4' : 'text-slate-100'}`}
                                    onClick={!isEmpty(company) ? () => navigate("/employees") : undefined}
                                >
                                    <FcDepartment />
                                    <p>Department</p>
                                </div>
                            )
                        }



                        {
                            props.page === 'messenger' ? (
                                <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                    <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                        <SiMessenger />
                                        <p>Messages</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={`flex items-center gap-2 cursor-pointer duration-300 ${!isEmpty(company) ? 'text-slate-500 hover:ml-4' : 'text-slate-100'}`}
                                    onClick={!isEmpty(company) ? () => navigate("/messenger") : undefined}
                                >
                                    <SiMessenger />
                                    <p>Messages</p>
                                </div>
                            )
                        }



                        {props.page === 'company' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <ImOffice />
                                    <p>Company</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/company")}>  <ImOffice /> <p>Company</p></div>)}

                    </div>
                </div>
                <div className='w-28 self-center mt-10 cursor-pointer hover:w-32 duration-100'>
                    <img src={support} alt="" className='w-full' />
                </div>
                <div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300 mb-5' onClick={handleLogoutClick}> <BiLogOut /><p>Logout</p></div>

            </div>
        </div>
    )
}

export default Homesidebar
