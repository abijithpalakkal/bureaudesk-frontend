import React, { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import Departmentsidebar from './Departmentsidebar'
import Listemployeecard from '../cards/Listemployeecard'
import fetchData from '@/utils/fetchdata'
import postData from '@/utils/postdata'
import { toast } from 'react-toastify';
import { BiArrowBack } from 'react-icons/bi'
import { RiArrowGoBackLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import Addtaskmodal from '../modals/Addtaskmodal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
const Assigntask = () => {

    const navigate = useNavigate()

    const [userdetails, setuserdetails] = useState([])
    const companyId = useSelector((state: RootState) => state.companydetails.company._id)
    const userRole = useSelector((state: RootState) => state.userdetails.user.Authorization)
    const userdpt = useSelector((state: RootState) => state.userdetails.user?.Departmentid)
    const userId = useSelector((state: RootState) => state.userdetails.user?._id)


    useEffect(() => {
        if (userRole == "root_node") {
            const getdata = async () => {
                const data = await postData("/user/getuserdetails", { companyid: companyId })
                setuserdetails(data.data)
            }
            getdata()
        } else {
            const getdata = async () => {
                const data = await postData("/user/getuserdetails", { Departmentid: userdpt })
                setuserdetails(data.data)
            }
            getdata()
        }


    }, [])

    const changedpt = async (id: any) => {

    
        try {
            const data = await postData("/user/getuserdetails", id)
            setuserdetails(data.data)
            
        } catch (err: any) {
            toast.error(err.message);
        }
    }


    return (
        <div className='w-5/6 h-screen px-2 py-2 '>
            <div className='h-full'>
                <Homenavbar />
                <div className='flex justify-between mt-11'>
                    <h1 className='font-bold text-3xl'>ASSIGN TASKS</h1>

                </div>
                <div className='w-10 h-10  flex justify-center items-center cursor-pointer mt-5 ' onClick={() => { navigate("/projects") }}><div className=' w-full h-full hover:w-8 hover:h-8 bg-blue-100 flex duration-150  justify-center items-center  border-black border rounded-full'><RiArrowGoBackLine className='w-full' /></div></div>
                <div className='flex gap-8 w-full'>
                    <div className='mt-6'>
                        {userRole == "root_node" && <Departmentsidebar setdpt={changedpt} />}
                    </div>
                    <div className='mt-5 w-full'>
                        <p className='font-semibold  text-2xl'>employees</p>
                        {
                            userdetails.map((obj: any, index: number) => (
                                obj._id !== userId && (
                                    <Listemployeecard key={index} item={obj} isassigntask={true} />
                                )
                            ))
                        }



                    </div>
                </div>
            </div>

        </div>
    )
}

export default Assigntask
