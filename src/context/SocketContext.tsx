import { RootState } from '@/redux/store';
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { SOCKET_URL } from "../config/constant";
import io from "socket.io-client"
import hotToast from 'react-hot-toast';
import { BiPhoneCall } from 'react-icons/bi';


interface SocketContextType {
    socket: any | null;
    messages: any[];
    onlineUsers: any[];
    globalChat: any[]
}

const socketContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: [],
    globalChat: []

});

export const useSocketContext = (): SocketContextType => {
    return useContext(socketContext);
}

const SocketContext = ({ children }: any) => {
    const [socket, setSocket] = useState<any | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [globalChat, setGlobalChat] = useState<any>([])

    const userid = useSelector((state: RootState) => state.userdetails.user?._id)
    const userrole = useSelector((state: RootState) => state.userdetails.user?.Authorization)

    useEffect(() => {

        if (userid && userrole!="admin") {
            const newSocket = io(SOCKET_URL, {
                query: {
                    userId: userid
                }
            })

            setSocket(newSocket)

            newSocket.on("getOnlineUsers", (users: any) => {
                setOnlineUsers(users)
            })

            newSocket.on("getGlobalChat", (data: any) => {
                setGlobalChat((prevChat:any) => [...prevChat, data]);
            })

            newSocket.on('incomingCall', (data: any) => {

                hotToast(
                    (_t) => (<div className='bg-green-100 h-10 flex justify-center items-center rounded-md gap-3'>
                        <BiPhoneCall className='h-8 w-8 text-green-500 ' />
                        <p className='font-medium'>   from {data?.userName}</p>
                        <p className='text-blue-500'><a href={data?.url}>join now</a></p>
                    </div>),
                    {
                        duration: 10000, // Display the toast for 10 seconds
                        position: 'top-center',
                    }
                )
            });

            //   return () => {
            //     console.log("socket close")
            //     newSocket.close()
            // };
        }
        // } else {
        //     if(socket) {
        //         socket.close()
        //     }
        //     setSocket(null)
        //   }
    }, [userid])


    const contextValue: SocketContextType = {
        socket, onlineUsers, globalChat,
        messages: []
    };


    return (
        <socketContext.Provider value={contextValue}>

            {children}
        </socketContext.Provider>
    )
}

export default SocketContext
