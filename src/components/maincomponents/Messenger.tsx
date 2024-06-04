import React, { useEffect, useState } from 'react'
import Homenavbar from './Homenavbar'
import { AiFillFileAdd, AiOutlineClose, AiOutlinePlus, AiOutlineSearch, AiOutlineSend } from 'react-icons/ai'
import { BsFilePlus, BsPlusSquareFill } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import logo from "../../assets/logo_without_writing-removebg-preview.png"
import Messengeremployees from '../cards/Messengeremployees'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import { toast } from 'react-toastify'
import addfile from "../../assets/attach.png"
import companylogo from "../../assets/logo_2-removebg-preview (4).png"
import { Socket } from 'socket.io-client'
import {useSocketContext } from "../../context/SocketContext"


const Messenger = () => {
    const user = useSelector((state: RootState) => state.userdetails.user)
    const [displayUserCard, setDisplayUserCard] = useState(false)
    const [availableChat, setAvailableChat] = useState([])
    const [chatUserId, setChatUserId] = useState<any>([])
    const [refresh, setRefresh] = useState(true)
    const [chat,setChat] = useState("")
    const {socket} = useSocketContext()
    const [chatId, setChatId] = useState("");


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await postData("/chat/getchat", {
                    participants: user._id
                });

                const chatData = data.data;
                const collectedUserIds = [];

                for (let i = 0; i < chatData.length; i++) {
                    let participants = chatData[i].participants;


                    participants = participants.filter((participantId: string) => participantId !== user._id);

                    for (let j = 0; j < participants.length; j++) {
                        collectedUserIds.push(participants[j]);
                        const userData = await fetchData(`/user/getuserbyid/${participants[j]}`);
                        participants[j] = userData;
                    }


                    chatData[i].participants = participants;
                }

                setAvailableChat(chatData);
                setChatUserId(collectedUserIds)
                console.log(availableChat, 159)
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };
        getData()

    }, [refresh])

    const submitChat = (e: any) => {


        e.preventDefault()

        if (chat.trim() === '') {
            toast.error("Message is empty");
            return;
          }
     
          socket.emit("new message",chat)
         

        console.log(chat)
        console.log("hello chat")
        setChat("")
        
    }

    const roomSelect =(id:string) =>{

        socket.emit("join chat",(id))

    }

    return (
        <div className='w-5/6 px-2 py-2 h-screen'>

            <div className='h-full flex-col flex'>
                <Homenavbar />
                <div className='flex justify-between mt-11 h-10'>
                    <h1 className='font-bold text-3xl'>MESSENGER</h1>
                </div>
                <div className='mt-3 w-full h-full '>
                    <div className='flex h-full rounded-2xl overflow-hidden bg-white'>
                        <div className='w-1/4 border-r-slate-300 border-r'>
                            <div className='flex justify-between items-center w-full p-4 border-b border-b-slate-300 h-14'>
                                <p className='font-semibold'>conversations</p>
                                <div className='flex gap-3'>
                                    <div className='bg-slate-300 rounded-lg h-6 w-6 flex justify-center items-center '>
                                        <AiOutlineSearch />
                                    </div>
                                    {!displayUserCard && <div className='bg-blue-400 rounded-lg h-6 w-6 flex justify-center items-center hover:bg-blue-500 duration-200' onClick={() => { setDisplayUserCard(true) }}>
                                        <AiOutlinePlus className='text-white' />
                                    </div>}
                                </div>
                            </div>
                            <div className='p-2 overflow-auto h-[500px]'>
                                {!displayUserCard && <div>
                                    {availableChat.map((item: any, index) => (
                                        <div className='flex gap-3  items-center mb-3 cursor-pointer' key={index} onClick={()=>{roomSelect(item._id)}}>
                                            <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                                <img src={item.participants[0].data.profileImage} alt="" />
                                            </div>
                                            <div>
                                                <p className='font-semibold'>{item.participants[0].data.Name}</p>
                                                <p className='text-slate-300'>Hi!please send a message..</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                                {displayUserCard &&
                                    <Messengeremployees setDisplayUserCard={setDisplayUserCard} refresh={refresh} setRefresh={setRefresh} chatUserId={chatUserId} />
                                }
                            </div>
                        </div>
                        <div className='w-3/4 flex flex-col'>
                            <div className='flex justify-between items-center p-1 px-3 border-b border-b-slate-300 h-16'>
                                <div className='flex gap-3 items-center relative'>
                                    <div className='w-2 h-2 bg-green-600 rounded-full absolute z-20 top-1'></div>
                                    <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden relative'>
                                        <img src={user?.profileImage} alt="" className='w-8 h-8' />
                                    </div>
                                    <div>
                                        <p className='font-semibold'>{user.Name ? user.Name : user.email}</p>
                                        <p className='text-slate-300'>{user.position}</p>
                                    </div>
                                </div>
                                <div className='flex gap-5'>
                                    <div className='bg-slate-300 rounded-lg h-7 w-7 flex justify-center items-center'>
                                        <AiOutlineSearch />
                                    </div>
                                    <div className="flex flex-col justify-between h-6">
                                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='m-3 flex flex-col justify-between h-full relative w-full pr-5'>
                                <div className=' h-full w-full  absolute flex justify-center items-center opacity-15'>
                                    <img src={companylogo} alt="" className='mb-11' />
                                </div>

                                <div className='z-0'>
                                    <div className='flex gap-3  mb-3 '>
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <div className='flex item-center gap-2 items-center'>
                                                <p className='font-semibold'>cnkj gnjlws</p>
                                                <p className='text-[13px] text-slate-600'>12:00 AM</p>
                                            </div>
                                            <p className='text-slate-700 mt-3'>Hi!please send a message dbvhs vnj sv jd c sn nd vns dvn sdnkv kns vnks vnk sknv snk vk akn vjca kjv</p>
                                        </div>
                                    </div>


                                    <div className='flex gap-3  mb-3 '>
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <div className='flex item-center gap-2 items-center'>
                                                <p className='font-semibold'>cnkj gnjlws</p>
                                                <p className='text-[13px] text-slate-600'>12:00 AM</p>
                                            </div>
                                            <p className='text-slate-700 mt-3'>Hi!please send a message dbvhs vnj sv jd c sn nd vns dvn sdnkv kns vnks vnk sknv snk vk akn vjca kjv</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3  mb-3 '>
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <div className='flex item-center gap-2 items-center'>
                                                <p className='font-semibold'>cnkj gnjlws</p>
                                                <p className='text-[13px] text-slate-600'>12:00 AM</p>
                                            </div>
                                            <p className='text-slate-700 mt-3'>Hi!please send a message dbvhs vnj sv jd c sn nd vns dvn sdnkv kns vnks vnk sknv snk vk akn vjca kjv</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3  mb-3 '>
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <div className='flex item-center gap-2 items-center'>
                                                <p className='font-semibold'>cnkj gnjlws</p>
                                                <p className='text-[13px] text-slate-600'>12:00 AM</p>
                                            </div>
                                            <p className='text-slate-700 mt-3'>Hi!please send a message dbvhs vnj sv jd c sn nd vns dvn sdnkv kns vnks vnk sknv snk vk akn vjca kjv</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3  mb-3 '>
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                            <img src="" alt="" />
                                        </div>
                                        <div>
                                            <div className='flex item-center gap-2 items-center'>
                                                <p className='font-semibold'>cnkj gnjlws</p>
                                                <p className='text-[13px] text-slate-600'>12:00 AM</p>
                                            </div>
                                            <p className='text-slate-700 mt-3'>Hi!please send a message dbvhs vnj sv jd c sn nd vns dvn sdnkv kns vnks vnk sknv snk vk akn vjca kjv</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='border border-black rounded-lg w-full h-9 px-3  z-30'>

                                    <form className='flex justify-between items-center' onSubmit={submitChat}>
                                        <img src={addfile} alt="" className='w-5 mr-5 duration-150' />
                                        <input
                                            type="text"
                                            id="event-name"
                                            value={chat}
                                            onChange={(e) => setChat(e.target.value)}
                                            placeholder='Type your message here..'
                                            className='rounded-lg p-1  h-full w-full border-none outline-none focus:ring-0'
                                        />
                                        <button className='w-7 h-7 bg-blue-400 rounded-lg flex justify-center items-center mt-1'>
                                            <BiSend className='w-6 h-6' />
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger
