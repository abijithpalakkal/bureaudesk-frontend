import  { useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { useSocketContext } from "../../context/SocketContext"
import { useSelector } from 'react-redux'
import dummy from "../../assets/dummy-profile-pic-300x300-1.png"
import messenger from '../../assets/messenger.webp'




export default function Activitystream() {
  const [chat, setchat] = useState("")
  const { socket } = useSocketContext()
  const { globalChat } = useSocketContext()
  const messagesEndRef = useRef<any>(null)

  const userName = useSelector((state: any) => state?.userdetails?.user?.Name)
  const userProfile = useSelector((state: any) => state?.userdetails?.user?.profileImage)



  useEffect(() => {
    if (messagesEndRef.current) {
      
      
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;

    }
  }, [globalChat]);



  const submitChat = (e: any) => {
    e.preventDefault()
    socket.emit("global_message", { chat, userName, userProfile })
    setchat("")
  }


  return (
    <div className='w-64 rounded-xl bg-white p-3 mt-5 h-64'>
      <div className='flex-col items-center justify-between mb-4'>
        <p className='text-xl font-semibold '>Global chat</p>


        <div className='h-40 rounded-lg mb-3 p-1 overflow-y-scroll  overflow-x-hidden ' ref={messagesEndRef}>
          <div className='mt-4 opacity-55'>
            <img src={messenger} alt="" />
          </div>
          {globalChat.map((obj) => (<div className='flex gap-1' >
            <div className='w-7 h-7 rounded-full flex justify-center items-center overflow-hidden '>
              {obj.userProfile ? <img src={obj.userProfile} alt="" className='' /> : <img src={dummy} alt="" className='' />}
            </div>
            <div>
              <p className='text-sm font-bold'>{obj.userName ? obj.userName : "unknown"}</p>
              <p className='text-sm'>{obj?.chat}</p>
            </div>
          </div>))}
        </div>


        <div className='border border-black rounded-lg w-full h-7 z-30 flex justify-center items-center'>
          <form className='flex justify-between items-center' onSubmit={submitChat}>
            <input
              type="text"
              id="event-name"
              value={chat}
              onChange={(e) => setchat(e.target.value)}
              placeholder='Type your message here..'
              className='rounded-lg p-1  h-3 w-full border-none outline-none focus:ring-0'
            />
            <button className='w-5 h-5 bg-blue-400 rounded-lg flex justify-center items-center mt-1'>
              <BiSend className='w-5 h-5' />
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
