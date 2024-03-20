import { createChatBotMessage } from 'react-chatbot-kit';
import Options from './Widget/Options';
import BotAvatar from './BotAvatar';
import UserAvatar from './UserAvatar';

const botName = 'Bot'


const config = {
    initialMessages: [createChatBotMessage(`Hi!, I'm ${botName}, I'm here to help you`)],
    botName: botName,
    customStyles: {
        botMessageBox: {
            backgroundColor: '#EEE9DA',
        },
        chatButton: {
            backgroundColor: '#6096B4',
        }
    },
    customComponents:{
        header: () => <div className=' bg-[#BDCDD6] p-5 rounded-tl-[5px] rounded-tr-[5px]'>Chat bot</div>,
        botAvatar: (props) => <BotAvatar {...props} />,
        userAvatar: (props) => <UserAvatar {...props} />
    },
    widgets: [
        {
        widgetName: "firstOptions",
        widgetFunc: (props) => <Options {...props} />,
        },
    ],
};

export default config;