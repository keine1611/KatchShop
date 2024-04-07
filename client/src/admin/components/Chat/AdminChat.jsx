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
    const [customerConnecting, setCustomerConnecting] = useState([])
    const [conversations, setConversations] = useState([])
    const [conversationsDisplay, setConversationDisplay] = useState([])
    const [curentConversation, setCurrentConversation] = useState(null)

    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }
        socket.emit('registerStaff', 1)

        socket.on('newChatRequest', listRequest => {
            setCustomerRequestChat(listRequest)
        })

        socket.on('getConnections', customerId=>{
            setCustomerConnecting(customerId)
        })


        socket.on('getMessage',(message)=>{
            console.log(message)
        })
        
        return () => {
            socket.off('newChatRequest');
            socket.off('getMessage')
            socket.off('getConnections')
            socket.disconnect()
        }
    }, [])

    useEffect(()=>{
        if(conversations){
            const arr = conversations.map((conversation)=>{
                let conver = {...conversation}
                let connect = false
                customerConnecting.forEach(id=>{
                    if(id == conver.otherAccount.id_acc){
                        connect = true
                        return
                    }
                })
                return {...conver, connect: connect}
                
            })
            setConversationDisplay(arr)
        }
    },[customerConnecting,conversations])
    useEffect(()=>{
        console.log(conversations)
    },[])


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
    

    const handleAcceptChat = (customerId) => {
        socket.emit('acceptChatRequest', customerId)
    }


    return (
        <>
            <div className=' w-full box-border p-3 '>
                <div className='grid grid-cols-12 rounded-t-3xl bg-blue-gray-50'>
                    <Conversation conversations={conversationsDisplay} setCurrentConversation={setCurrentConversation}
                     curentConversation={curentConversation} customerRequestChat={customerRequestChat} handleAcceptChat={handleAcceptChat} />
                    <MessagesFrame curentConversation={curentConversation} socket={socket}/>
                </div>
            </div>

        </>
    )
}

export default AdminChat