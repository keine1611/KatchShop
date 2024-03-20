import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import MessagesFrame from './MessagesFrame'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'


const Chat = () => {
    const [chatOpen, setChatOpen] = useState(false)

    const handleStateChange = ()=>{
        setChatOpen(prev=> !prev)
    }

    return (
        <>
        {chatOpen?
            (<div className=' fixed bottom-0 right-5 z-50 w-1/3 h-2/3 '>
                <MessagesFrame></MessagesFrame>
            </div>)
            :<img onClick={() => handleStateChange()} className='hover:cursor-pointer h-14 object-fill fixed bottom-5 right-2' src={process.env.PUBLIC_URL + "/icon/chat.svg"}></img>
        }
        </>
    )
}

export default Chat