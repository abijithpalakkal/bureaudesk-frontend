import { useEffect, useState } from 'react'
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import postData from '@/utils/postdata'
import { toast } from 'react-toastify'


const Messengeremployees = ({ setDisplayUserCard, refresh, setRefresh,chatUserId }: {
    setDisplayUserCard: any
    refresh: boolean
    setRefresh: any
    chatUserId:any
}) => {
    const [companyUsers, setCompanyUsers] = useState([])
    const [addStatus, setAddedStatus] = useState<any>([])

    
   
    const companyId = useSelector((state: RootState) => state.companydetails.company._id)
    const userId = useSelector((state: RootState) => state.userdetails.user._id)
    useEffect(() => {
        const getData = async () => {
            if (companyId) {
                const data = await postData("/user/getuserdetails", {
                    companyid: companyId
                })
                setCompanyUsers(data.data)
            }

        }
        getData()


    },[])

    const createChat = async (id: string) => {
        try {
            await postData("/chat/addchat", {
                participants: [userId, id]
            })
            setAddedStatus([...addStatus, id])

        } catch {
            toast.error("unable to add")
        }


    }
    return (
        <>
            <div className=''>
                <div className='flex justify-between mb-3'>
                    <div className='w-12 '>
                        <img src={logo} alt="" />
                    </div>
                    <div className='bg-blue-100 w-6 h-6 rounded-md flex justify-center items-center hover:bg-blue-500  duration-500' onClick={() => {
                        setRefresh(!refresh);
                        setDisplayUserCard(false);
                    }}
                    ><AiOutlineClose /></div>
                </div>
                {companyUsers
                .filter((item:any) => !chatUserId.includes(item._id))
                .map((item: any, index) => (
                    <div key={index} className='flex items-center mb-3 '>
                        <div className='w-10'>
                            <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                <img src={item.profileImage} alt="" className='w-8 h-8' />
                            </div>
                        </div>
                        <div className='w-44'>
                            <p className='font-semibold'>{item.Name ? item.Name : item.email}</p>
                            <p className='text-slate-300'>Hi! please send a message..</p>
                        </div>
                        <div className='w-6 ml-4'>
                            {addStatus.includes(item._id) ? (
                                <div
                                    className='rounded-lg h-6 w-6 ml-3 flex justify-center items-center'
                                    onClick={() => createChat(item._id)}
                                >
                                    <p className='text-2xl'>✅</p>
                                </div>
                            ) : (
                                <div
                                    className='bg-blue-400 rounded-lg h-6 w-6 ml-3 flex justify-center items-center hover:bg-blue-500 duration-200'
                                    onClick={() => createChat(item._id)}
                                >
                                    <AiOutlinePlus className='text-white' />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Messengeremployees
