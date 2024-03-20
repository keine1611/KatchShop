import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Moment from 'react-moment'
import { useSocketContext } from '../../contexts/SocketChatContext'
import { useAuth } from '../../../context/AuthContext'
import { Socket } from 'socket.io-client'

const MessagesFrame = ({ curentConversation, socket }) => {
    const [customer, setCustomer] = useState(null)
    const [messages, setMessages] = useState([])
    const { user } = useAuth()
    const [socketRecieveId, setSoketReceiveId] = useState(null)
    const [text, setText] = useState('')


    useEffect(() => {
        if (curentConversation) {
            axios.get('/api/conversation/admin?id_admin=' + user.user.id_acc + '&id=' + curentConversation)
                .then((result) => {
                    setCustomer(result.data.customer)
                    setMessages(result.data.messages)
                }).catch((err) => {
                    setCustomer(null)
                    setMessages([])
                })
        }
        socket.on('getMessage',(message)=>{
            if(message.id_conversation === curentConversation){
                setMessages(prev=>[...prev, message])
            }
        })

        return ()=>{
            socket.off('getMessage')
        }
    }, [curentConversation])

    const handleSendMessage = () => {
        // socket.emit('sendMessage', ({ senderId: 1, receiverId: 3, content: text }))
        // setMessages(prev => [...prev, {id_send: 1, id_receive: 3, content: text, timestamp: new Date()}])
        // setText('')
    }

    return (
        <div className=' col-span-8 '>
            {customer &&
                <>
                    <div className=' w-full h-16 max-h-40 bg-blue-gray-400 rounded-tr-3xl py-5 px-2'>
                        <p className='text-xl h-fit'>To: <span className=' text-black'>{customer.name_cus}</span></p>
                    </div>
                    <div className='px-10 mt-5 h-[460px] overflow-y-auto'>
                        {messages.map((message) => {
                            if (message.id_send !== customer.id_acc) {
                                return (
                                    <div className="chat chat-end">
                                        <div className="chat-bubble">{message.content}</div>
                                        <div className="chat-footer opacity-50">
                                            <time className="text-xs opacity-50"><Moment fromNow>{message.timestamp.toString()}</Moment></time>
                                        </div>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div className="chat chat-start">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS chat bubble component" src={'/uploads/images/avatars/' + customer.avatar_acc} />
                                            </div>
                                        </div>
                                        <div className="chat-bubble">{message.content}</div>
                                        <div className="chat-footer opacity-50">
                                            <time className="text-xs opacity-50"><Moment fromNow>{message.timestamp.toString()}</Moment></time>
                                        </div>
                                    </div>
                                )
                            }
                        })}


                    </div>
                    <div className=' w-full px-10'>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" placeholder="Type here" className="grow" value={text} onChange={(e) => setText(e.target.value)} onSubmit={handleSendMessage}></input>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </label>

                    </div>
                </>
            }

        </div>
    )
}

export default MessagesFrame