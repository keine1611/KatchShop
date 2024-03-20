import React from 'react'

const Conversation = ({ conversations, setCurrentConversation }) => {
    const handleConversationClick = (id) => {
        setCurrentConversation(id)
    }
    return (
        <div className='col-span-4 bg-blue-gray-400 rounded-tl-3xl border-r-4 border-black p-10'>
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>

            <div className='my-9 w-full h-[0.5px] bg-blue-gray-900'></div>
            <div className=''>
                {conversations.map((conver) => {
                    return (
                        <div onClick={() => handleConversationClick(conver.id)} key={conver.id} className='flex flex-row items-center gap-4 my-2 bg-white rounded-full px-2 py-2 hover:cursor-pointer hover:bg-blue-gray-300 duration-500'>
                            <div className="avatar online">
                                <div className="w-12 rounded-full">
                                    <img src={'/uploads/images/avatars/' + conver.account.avatar_acc} />
                                </div>
                            </div>
                            <span className=' text-xl text-black font-medium'>{conver.account.customer.name_cus}</span>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default Conversation