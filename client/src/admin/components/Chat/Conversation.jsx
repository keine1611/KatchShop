import React, { useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Avatar } from '@mui/material';

const Conversation = ({ conversations, setCurrentConversation, curentConversation, customerRequestChat, handleAcceptChat }) => {
    const handleConversationClick = (id) => {
        setCurrentConversation(id)
    }

    const [notificationState, setNotificationState] = useState(false)



    return (
        <div className='col-span-4 bg-white rounded-tl-3xl border-r-2 border-black p-10'>
            <div className=' flex flex-row gap-1 items-center'>
                <label className="input input-bordered border-1 border-black flex items-center gap-2 w-full">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <div className='relative' onMouseEnter={()=> setNotificationState(true)} onMouseLeave={()=>setNotificationState(false)}>
                    <NotificationsNoneIcon className=' text-black hover:cursor-pointer' style={{ fontSize: 38 }}  />
                    <span className=' absolute bottom-0 right-2 text-red-800 bg-white rounded-full px-[2px] m-0 text-xs  font-bold'>{customerRequestChat.length}</span>
                    <div className={`w-64  absolute bg-blue-gray-50 h-56 right-0 rounded-t-md shadow-md p-4 transition-transform ${notificationState? `block`:`hidden`}`}>
                        {customerRequestChat.map(request => {
                            return (
                                <div key={request.id} className='w-full grid grid-cols-12 items-center mt-2'>
                                    <Avatar className=' col-span-3' src={'/uploads/images/avatars/' + request.avatar_acc}></Avatar>
                                    <span className='col-span-5 text-black '>{request.name}</span>
                                    <div className=' col-span-4'>
                                        <button onClick={()=>handleAcceptChat(request.id_acc)} className=" btn-sm btn btn-outline btn-accent">Accept</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>


            <div className='my-9 w-full h-[0.5px] bg-blue-gray-900'></div>
            <div className=''>
                {conversations.map((conver) => {
                    return (
                        <div onClick={() => handleConversationClick(conver.id)} key={conver.id} className={`flex flex-row items-center gap-4 my-2 rounded-full px-2 py-2 hover:cursor-pointer hover:bg-lightBlue duration-500 ${conver.id === curentConversation ? 'bg-lightBlue' : 'bg-white'}`}>
                            <div className="avatar online">
                                <div className="w-12 rounded-full">
                                    <img src={'/uploads/images/avatars/' + conver.otherAccount.avatar_acc} />
                                </div>
                            </div>
                            <span className=' text-lg text-black font-medium'>{conver.otherAccount.name}</span>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Conversation