import { RootState } from '@/redux/store';
import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { SOCKET_URL } from "../config/constant";
import io from "socket.io-client"

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

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
              })

              return () => {
                console.log("socket close")
                newSocket.close()
            };
              
        } else {
            if(socket) {
              socket.close()
            }
            setSocket(null)
          }
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
