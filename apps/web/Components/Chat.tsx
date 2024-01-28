"use client"

import { useState } from "react"
import { useSocket } from "../Context/SocketProvider"

const Chat = () => {
     const { sendMessage, messages } = useSocket()
     const [message, setMessage] = useState('')
     console.log('mess', messages)
     return (
          <div>
               <div className="flex align-items-center">
                    <input className="p-2 rounded border-black border-2" onChange={e => setMessage(e.target.value)} value={message} placeholder="Write message..." />
                    <button className="bg-slate-100 p-2" onClick={() => sendMessage(message)}>Send</button>
               </div>
               <div>
                    {messages.map(m => <p>{m.message}</p>)}
               </div>
          </div>
     )
}

export default Chat