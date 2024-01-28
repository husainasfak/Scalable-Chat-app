"use client"

import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
     children?: React.ReactNode
}

interface ISocketContext {
     sendMessage: (msg: string) => any;
     messages: string[]

}

const SocketContect = React.createContext<ISocketContext | null>(null);


export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
     const [socket, setSocket] = useState<Socket | null>()
     const [messages, setMessages] = useState<string[]>([])
     const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
          if (socket) {
               socket.emit('event:message', { message: msg })
          }
     }, [socket])

     useEffect(() => {
          const _socket = io('http://localhost:8000')
          _socket.on('message', onMessageRec)
          setSocket(_socket)
          return () => {
               _socket.disconnect()
               _socket.off('message', onMessageRec)
               setSocket(null)
          }
     }, [])

     const onMessageRec = useCallback((msg: string) => {
          console.log('From server', msg)
          const message = JSON.parse(msg) as { message: string }
          setMessages((prev) => [...prev, message])
     }, [])
     return (
          <SocketContect.Provider value={{ sendMessage, messages }}>
               {children}
          </SocketContect.Provider>
     )
}



export const useSocket = () => {
     const state = useContext(SocketContect)
     if (!state) throw new Error('State is undefined');
     return state;
}