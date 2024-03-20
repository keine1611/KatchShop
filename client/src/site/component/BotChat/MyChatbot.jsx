import React, { useEffect, useState } from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './config'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import io from 'socket.io-client'


const socket = io('http://localhost:8080', { autoConnect: false })


const MyChatbot = () => {

    const [state, setState] = useState(false)
    const [messages, setMessages] = useState([])
    const [connectedStaff, setConnectedStaff] = useState(true)

    useEffect(() => {
        if(connectedStaff){ 
            socket.connect()
        }
        else
            socket.on('disconnect', ()=>{   
                console.log('disconected')
            })
    }, [connectedStaff])

    useEffect(() => {           
        socket.on('getMessage', (data) => {
            console.log(data)
            setMessages([...messages, { id: messages.length + 1, message: data }])
        })
    }, [])

    const handleUserMessage = (message) => {
        setMessages([...message, { id: messages.length + 1, message }])
        socket.emit('sendMessage', message)
    }
    const connectStaff = () => {
        setConnectedStaff(true)
    }

    const HandleStateChange = () => {
        setState(!state)
    }
    return (
        <>
            {state ? (<div className=''>
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    messages={messages}
                    handleUserMessage={handleUserMessage}
                    connectStaff={connectStaff}
                >
                </Chatbot>
            </div>) :
                <img onClick={() => HandleStateChange()} className='hover:cursor-pointer h-14 object-fill fixed bottom-5 right-2' src={process.env.PUBLIC_URL + "/icon/chat.svg"}></img>
            }
        </>
    )
}

export default MyChatbot