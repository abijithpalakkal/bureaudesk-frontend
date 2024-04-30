import { BiCalendarEvent, BiLogOut } from 'react-icons/bi'
import { BsListTask, BsPersonSquare } from 'react-icons/bs'
import { FcDepartment } from 'react-icons/fc'
import { RiDashboardLine } from 'react-icons/ri'
import { SiMessenger } from 'react-icons/si'
import logo from '../../assets/logo_2-removebg-preview (4).png'
import { ImOffice } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import support from "../../assets/Support.png"
import { userdetailslogout } from '../../redux/slices/userreducer/userReducer'
import { usercompanylogout } from '../../redux/slices/companyreducer/companyReducer'
import fetchData from '../../utils/fetchdata'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

interface HomesidebarProps {
    page: string;
}

function Homesidebar(props: HomesidebarProps) {
    const dispatch = useDispatch<AppDispatch>()
    const comapanyimage = useSelector((state: RootState) => state.companydetails.company.Companylogo)
    const comapanyName = useSelector((state: RootState) => state.companydetails.company.Name)

    const handleLogoutClick = async () => {
        const data = await fetchData("/auth/logout")
        dispatch(userdetailslogout())
        dispatch(usercompanylogout())
        navigate("/")
    
      }
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
                        <div className='flex items-center gap-2 text-slate-500 cursor-pointer  hover:ml-4 duration-300'><RiDashboardLine /><p className=''>dashboard</p></div>
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300'> <BsListTask /><p>project</p></div>

                        {props.page === "events" ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500 duration-1000'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <BiCalendarEvent />
                                    <p>events</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/events")}> <BiCalendarEvent /><p>events</p></div>)}


                        {props.page === 'department' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500 transition-transform duration-1000'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <FcDepartment />
                                    <p>department</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/employees")}>  <FcDepartment /><p>department</p></div>)}
                        <div className='flex items-center gap-2  text-slate-500 cursor-pointer  hover:ml-4 duration-300'> <SiMessenger /><p>messages</p></div>
                        {props.page === 'profile' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <BsPersonSquare />
                                    <p>profile</p>
                                </div>
                            </div>
                        ) : <div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/viewprofile")}> <BsPersonSquare /><p>profile</p></div>}
                        {props.page === 'company' ? (
                            <div className='bg-slate-200 h-9 flex items-center px-3 rounded-md border-r-4 border-blue-500'>
                                <div className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <ImOffice />
                                    <p>company</p>
                                </div>
                            </div>
                        ) : (<div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300' onClick={() => navigate("/company")}>  <ImOffice /> <p>company</p></div>)}

                    </div>
                </div>
                <div className='w-28 self-center mt-10 cursor-pointer hover:w-32 duration-100'>
                 <img src={support} alt=""  className='w-full'/>
                </div>
              <div className='flex items-center gap-2  text-slate-500 cursor-pointer hover:ml-4 duration-300 mb-5' onClick={handleLogoutClick}> <BiLogOut/><p>logout</p></div>


            </div>
        </div>
    )
}

export default Homesidebar
