import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import Moment from 'react-moment'
import { useSocketContext } from '../../../admin/contexts/SocketChatContext'
import { set } from 'react-hook-form'
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080', { autoConnect: false })

const MessagesFrame = () => {
    const id = 3
    const [socketRecieveId, setSoketReceiveId] = useState(null)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])
    const [realTimeEnabled, setRealTimeEnabled] = useState(false)
    const refMessages = useRef()

    useEffect(() => {
        axios.get('/api/message/' + id)
            .then((result) => {
                setMessages(result.data)
            }).catch((err) => {
                setMessages([])
            })

        socket.on('startChat', () => {
        })
        socket.on('getMessage', message => {
            setMessages(prev => [...prev, message])
        })

        return () => {
            socket.off('startChat')
            socket.off('getMessage')
            socket.disconnect()
        }
    }, [])

    useEffect(()=>{
        function scrollToBottom(){
            if(refMessages.current)
                refMessages.current.scrollTop = refMessages.current.scrollHeight
        }
        scrollToBottom()
    },[messages])

    const handleConnectStaff = () => {
        if (!socket.connected)
            socket.connect()
        socket.emit('requestChat', id)
    }

    const handleSendMessage = () => {
        if(text  !== ''){
            socket.emit('sendMessage', ({ senderId: 3, receiverId: 1, content: text }))
            setMessages(prev => [...prev, { id_send: 3, id_receive: 1, content: text, timestamp: new Date() }])
            setText('')
        }
        
    }

    return (
        <div className='bg-white rounded-t-3xl h-full'>
            <div className=' w-full h-fit bg-greyButton rounded-t-3xl py-5 px-2 flex flex-row justify-between'>
                <p className='text-lg h-fit'>To: <span className=' text-black'>Staff</span></p>
                <button onClick={handleConnectStaff} className=' border border-black rounded-md px-2 shadow-lg bg-white text-black hover:bg-blue-gray-200'>Connect Staff</button>
            </div>
            <div className='px-10 mt-5 overflow-y-auto max-h-80 ' ref={refMessages}>
                {messages.map((message) => {
                    if (message.id_send === id) {
                        return (
                            <div className="chat chat-end">
                                <div className="chat-bubble text-sm bg-bgyellow text-black">{message.content}</div>
                                <div className="chat-footer opacity-50">
                                    <time className=" text-xs opacity-50"><Moment fromNow>{message.timestamp.toString()}</Moment></time>
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS chat bubble component" src={'/uploads/images/avatars/avatar_default.jpg'} />
                                    </div>
                                </div>
                                <div className="chat-bubble text-sm bg-bgyellow text-black">{message.content}</div>
                                <div className="chat-footer opacity-50">
                                    <time className="text-xs opacity-50"><Moment fromNow>{message.timestamp.toString()}</Moment></time>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className=' w-full px-10 mt-4'>
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage() }}>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" placeholder="Type here" className="grow" value={text} onChange={(e) => setText(e.target.value)}></input>
                        <svg onClick={handleSendMessage} className=' hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default MessagesFrame