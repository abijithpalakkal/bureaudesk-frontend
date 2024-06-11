import { RootState } from '@/redux/store';
import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { SOCKET_URL } from "../config/constant";
import io from "socket.io-client"
import hotToast from 'react-hot-toast';
import { BsFillPhoneLandscapeFill } from 'react-icons/bs';
import { BiPhoneCall } from 'react-icons/bi';


interface SocketContextType {
    socket: any | null;
    messages: any[];
    onlineUsers: any[];
}

const socketContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    onlineUsers: [],
});

export const useSocketContext = (): SocketContextType => {
    return useContext(socketContext);
}

const SocketContext = ({ children }: any) => {
    const [socket, setSocket] = useState<any | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const userid = useSelector((state: RootState) => state.userdetails.user._id)

    useEffect(() => {
        
        if (userid) {
            console.log("this is socket",SOCKET_URL)
            const newSocket = io(SOCKET_URL, {
                query: {
                    userId: userid
                }
            })
            
            setSocket(newSocket)
            console.log(socket,12356)

            newSocket.on("getOnlineUsers", (users:any) => {
                setOnlineUsers(users)
                console.log(users,152)
              })

              newSocket.on('incomingCall', (data:any) => {
                console.log('Incoming call from:', data);

                hotToast(
                    (t) => (<div className='bg-green-100 h-10 flex justify-center items-center rounded-md gap-3'>
                        <BiPhoneCall className='h-8 w-8 text-green-500 '/>
                        <p className='font-medium'>   from abijith</p>
                        <p className='text-blue-500'><a href='/'>join now</a></p>
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
    },[userid])


    const contextValue: SocketContextType = {
        socket, onlineUsers,
        messages: []
      };


    return (
        <socketContext.Provider value={contextValue}>
            
        {children}
      </socketContext.Provider>
    )
}

export default SocketContext
