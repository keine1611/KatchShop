import React from 'react'
import { createChatBotMessage } from 'react-chatbot-kit';




const Options = (props) => {
  const options = [
    { text: 'Can anyone chat now?', handler: ()=>{props.connectStaff();props.actionProvider.handleConnectStaff()}, id: 1 },
    { text: 'Promotional watches', handler: () => { }, id: 2 },
    { text: 'Store operating hours?', handler: props.actionProvider.handleStoreOpenHours, id: 3 },
    { text: 'Can I buy a watch in installments?', handler: () => { }, id: 4 },
    { text: 'Track my order', handler: () => { }, id: 5 },
  ]

  const optionsMarkup = options.map((option) => (
    <button
      className='p-2 rounded-3xl bg-transparent border border-solid border-green-800 m-1'
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ))

  return (
    <div className=' flex  items-start flex-wrap  ml-10'>{optionsMarkup}</div>
  )
}

export default Options