import  { useEffect, useRef, useState } from 'react'
import Homenavbar from './Homenavbar'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { BsCameraVideo } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Messengeremployees from '../cards/Messengeremployees'
import postData from '@/utils/postdata'
import fetchData from '@/utils/fetchdata'
import { toast } from 'react-toastify'
import addfile from "../../assets/attach.png"
import companylogo from "../../assets/logo_2-removebg-preview (4).png"
import { useSocketContext } from "../../context/SocketContext"
import { format, toZonedTime } from 'date-fns-tz';



const Messenger = ({ setZeegooCloud, setData }: any) => {
    const user = useSelector((state: RootState) => state.userdetails.user)
    const [displayUserCard, setDisplayUserCard] = useState(false)
    const [availableChat, setAvailableChat] = useState<any>([])
    const [chatUserId, setChatUserId] = useState<any>([])
    const [chatSelect, setChatSelect] = useState<any>(null)
    const [refresh, setRefresh] = useState(true)
    const [chat, setChat] = useState("")
    const [userId, setUserId] = useState("")
    const [marker, setMarker] = useState("")
    const { socket } = useSocketContext()
    const [chatId, setChatId] = useState("");
    const [chatMessages, setChatMessages] = useState<any | null>(null)
    const messagesEndRef = useRef<any>(null)
    const { onlineUsers } = useSocketContext()




    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [chatMessages]);


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

            } catch (error: any) {
                toast.error(error);
            }
        };
        getData()

    }, [refresh])

    useEffect(() => {
        if (availableChat.length > 0) {
            roomSelect(availableChat[0]?._id);
            setUserId(availableChat[0]?.participants[0].data._id);
            setMarker(availableChat[0]?._id);
            setChatSelect({
                id: availableChat[0].participants[0].data._id,
                img: availableChat[0].participants[0].data.profileImage,
                name: availableChat[0].participants[0].data.Name,
                email: availableChat[0].participants[0].data.email,
                position: availableChat[0].participants[0].data.position


            })
        }

    }, [availableChat])

    const submitChat = async (e: any) => {

        e.preventDefault()

        if (chat.trim() === '') {
            toast.error("Message is empty");
            return;
        }
        // console.log({ chat, chatId })

        const obj = {
            chatId,
            sender: user._id,
            sentAt: userId,
            content: chat,
        }

        socket.emit("new message", { obj: { ...obj, createdAt: new Date() }, chatId })
        setChatMessages((prev: any) => [...prev, { ...obj, createdAt: new Date() }])

        try {
            await postData("/chat/sendmessage", obj)
        } catch (e: any) {
            toast.error(e.message)
        }
        // console.log(chat)
        // console.log("hello chat")
        setChat("")

        socket?.off().on("message recieved", (newMessage: any) => {
            if (newMessage.sender != user._id) {
                setChatMessages((prev: any) => [...prev, newMessage])
            }

        })
    }


    const roomSelect = async (id: string) => {
        setChatId(id)
        socket.emit("join chat", (id))
        try {
            const data: any = await fetchData(`/chat/getchatbyid/${id}`)

            setChatMessages(data.data.chatId)
        } catch (e: any) {
            toast.error(e.message)
        }


    }

   




    const handleVideoCall = () => {
        if (onlineUsers.includes(userId)) {
            setData({ userId, userName: user.Name })
            setZeegooCloud(true)


        } else {
            toast.error("user not online")
        }


    }
    

    function convertUtcToIstTime(utcDateString:string):string {
        const timeZone = 'Asia/Kolkata';
        const utcDate = new Date(utcDateString);
        const zonedDate = toZonedTime(utcDate, timeZone);
        const formattedTime = format(zonedDate, 'hh:mm a', { timeZone });
        return formattedTime;
    }

    return (
        <>
            <div className='w-5/6 px-2 py-2 h-screen'>
                <div className='h-full flex-col flex'>
                    <Homenavbar />
                    <div className='flex justify-between mt-11 h-10'>
                        <h1 className='font-bold text-3xl'>MESSENGER</h1>
                    </div>
                    <div className='mt-3 w-full h-full'>
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
                                    {!displayUserCard && (
                                        <div>


                                            {availableChat.map((item: any, index: number) => (
                                                marker === item._id ? (
                                                    <div
                                                        className='flex gap-3 items-center mb-3 cursor-pointer bg-blue-100 py-1 px-3 rounded-lg relative'
                                                        key={index}
                                                        onClick={() => {
                                                            roomSelect(item._id);
                                                            setUserId(item.participants[0].data._id);
                                                            setMarker(item._id);
                                                            setChatSelect({
                                                                id: item.participants[0].data._id,
                                                                img: item.participants[0].data.profileImage,
                                                                name: item.participants[0].data.Name,
                                                                email: item.participants[0].data.email,
                                                                position: item.participants[0].data.position


                                                            })
                                                        }}>
                                                        {onlineUsers.includes(item.participants[0].data._id) && <div className='w-2 h-2 bg-green-600 rounded-full absolute z-20 top-1 mt-2'></div>}
                                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                                            <img src={item.participants[0].data.profileImage} alt="" />
                                                        </div>
                                                        <div>
                                                            <p className='font-semibold'>{item.participants[0].data.Name}</p>
                                                            <p className='text-slate-500'>{item?.latestMessage?.content}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className='flex gap-3 items-center mb-3 cursor-pointer py-1 px-3 rounded-lg relative'
                                                        key={index}
                                                        onClick={() => {
                                                            roomSelect(item._id);
                                                            setUserId(item.participants[0].data._id);
                                                            setMarker(item._id);
                                                            setChatSelect({
                                                                id: item.participants[0].data._id,
                                                                img: item.participants[0].data.profileImage,
                                                                name: item.participants[0].data.Name,
                                                                email: item.participants[0].data.email,
                                                                position: item.participants[0].data.position


                                                            })
                                                        }}>
                                                        {onlineUsers.includes(item.participants[0].data._id) && <div className='w-2 h-2 bg-green-600 rounded-full absolute z-20 top-1 mt-2'></div>}
                                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden'>
                                                            <img src={item.participants[0].data.profileImage} alt="" />
                                                        </div>
                                                        <div>
                                                            <p className='font-semibold'>{item.participants[0].data.Name}</p>
                                                            <p className='text-slate-300'>{item?.latestMessage?.content}</p>
                                                        </div>

                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {displayUserCard &&
                                        <Messengeremployees setDisplayUserCard={setDisplayUserCard} refresh={refresh} setRefresh={setRefresh} chatUserId={chatUserId} />
                                    }
                                </div>
                            </div>
                            <div className='w-3/4 flex flex-col h-full'>
                                <div className='flex justify-between items-center p-1 px-3 border-b border-b-slate-300 h-16'>
                                    <div className='flex gap-3 items-center relative'>
                                        {onlineUsers.includes(chatSelect?.id) && <div className='w-2 h-2 bg-green-600 rounded-full absolute z-20 top-1'></div>}
                                        <div className='w-8 h-8 border rounded-full flex justify-center items-center overflow-hidden relative'>
                                            <img src={chatSelect?.img} alt="" className='w-8 h-8' />
                                        </div>
                                        <div>
                                            <p className='font-semibold'>{chatSelect?.name ? chatSelect?.name : chatSelect?.email}</p>
                                            <p className='text-slate-300'>{chatSelect?.position}</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-5 justify-center items-center'>
                                        <div className='flex justify-center items-center  rounded-lg w-10 h-10' onClick={handleVideoCall}>
                                            <BsCameraVideo className='w-10 h-6 font-bold hover:h-8 duration-200 hover:text-green-500' />
                                        </div>
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

                                    <div className='z-0 h-[450px] overflow-y-scroll ' ref={messagesEndRef}>
                                        <div className='flex gap-3  mb-3 h-full '>
                                            <div className='w-full'>
                                                <div className="flex-1 mb-4 w-full overflow-hidden" >
                                                    {chatMessages?.map((msg: any, index: any) => {

                                                        return (
                                                            <div key={index} className={`flex ${msg.sender === user._id ? 'justify-end' : 'justify-start'}`}>
                                                                <div
                                                                    className={`mb-2 p-2 rounded-lg max-w-xs ${msg.sender !== user._id ? 'bg-blue-100 text-left' : 'bg-green-100 text-right mr-3'
                                                                        }`}
                                                                >
                                                                    <p>{msg?.content}</p>
                                                                    <div className="flex items-center gap-2 justify-between">
                                                                        <p className="font-semibold"></p>
                                                                        <p className="text-[13px] text-slate-600">{convertUtcToIstTime(msg?.createdAt)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
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
                                                className='rounded-lg p-1  h-full w-full border-none outline-none focus:ring-0 '
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

        </>
    )
}

export default Messenger
