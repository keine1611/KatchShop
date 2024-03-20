import { all } from 'axios';
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const updateMessages = (message)=>{
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
        }));
    }

    const handleHello = () => {
        const botMessage = createChatBotMessage('Hi guys, May I help you?', {widget: 'firstOptions'});
        updateMessages(botMessage)
    };

    const handleStoreOpenHours  = ()=>{
        const message = createChatBotMessage('Our store is open from 8:00 AM to 10:00 PM')
        updateMessages(message)
    }

    const handleConnectStaff = ()=>{
        const message = createChatBotMessage('Connecting to support staff, please wait!!!')
        updateMessages(message)
    }


    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleStoreOpenHours,
                        handleConnectStaff
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;