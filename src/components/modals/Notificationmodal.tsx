import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationFalse } from '@/redux/slices/notificationreducer/notificationReducer'
import fetchData from '@/utils/fetchdata'



const Notificationmodal = () => {
    const id = useSelector((state: any) => state.userdetails.user._id)
const [notification,setnotification]= useState([])

    useEffect(() => {
        const getData = async () => {
            const {data}=await fetchData(`/notification/notification/findall/${id}`)
            setnotification(data)
        }
        getData()
    },[])
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setNotificationFalse())

    }
    return (
        <div className="fixed z-40 inset-0 overflow-y-auto ">
            <div className="flex items-start justify-end min-h-screen h-screen ">
                <div className="inset-0 bg-black opacity-50 relative h-full w-full"></div>
                <div className="bg-white rounded-lg shadow-2xl p-6 absolute mt-12 mr-3 w-72">
                    <div className='flex justify-between'>
                        <div className='w-12'>
                            <img src={logo} alt="" />
                        </div>
                        <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center  hover:bg-blue-500 duration-500' onClick={handleClose}><AiOutlineClose /></div>
                    </div>
                    
                    {notification.length==0 ? <p className='text-center font-medium'>no data</p>:notification.map((obj:{userId:string,notification:string},index)=>(<div key={index} className=' border-b-2 mt-2 border-blue-400 p-1 pb-2'>
                        <p className='font-medium'>{obj?.notification}</p>
                    </div>))}
                   

                </div>
            </div>
        </div>
    )
}

export default Notificationmodal
