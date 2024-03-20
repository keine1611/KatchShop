import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import MessagesFrame from './MessagesFrame'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('http://localhost:8080', { autoConnect: false })

const AdminChat = () => {
    const { user } = useAuth()
    const id = user.user.id_acc
    const [customerRequestChat, setCustomerRequestChat] = useState([])

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('registerStaff', 1)

        socket.on('newChatRequest', listRequest => {
            setCustomerRequestChat(listRequest)
        })

        socket.on('getMessage',(message)=>{
            console.log(message)
        })
        
        return () => {
            socket.off('newChatRequest');
            socket.off('getMessage')
            socket.disconnect()
        }

    }, [])
    useEffect(() => {
        const getConversations = () => {
            axios.get('/api/conversation/admin/' + id)
                .then((result) => {
                    setConversations(result.data)
                }).catch((err) => {
                    setConversations([])
                })
        }
        getConversations()
    }, [id])
    const [conversations, setConversations] = useState([])
    const [curentConversation, setCurrentConversation] = useState(null)

    const handleAcceptChat = (customerId) => {
        socket.emit('acceptChatRequest', customerId)
    }


    return (
        <>
            <div className=' w-full box-border p-3 '>
                <div className='grid grid-cols-12 rounded-t-3xl bg-blue-gray-50'>
                    <Conversation conversations={conversations} setCurrentConversation={setCurrentConversation}
                     curentConversation={curentConversation} customerRequestChat={customerRequestChat} handleAcceptChat={handleAcceptChat} />
                    <MessagesFrame curentConversation={curentConversation} socket={socket}/>
                </div>
            </div>

        </>
    )
}

export default AdminChat