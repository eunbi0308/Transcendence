import React from 'react';
import './css/App.css';
import { useFetchRequest} from './FetchRequest.tsx';
import { ChatUser } from './ChatUser.tsx'
import { ChatContact } from './ChatContact.tsx';
import { ChatMessages } from './ChatMessages.tsx';
import { Chat } from './Chat.tsx';
import io from 'socket.io-client';

const ChatContainer = ( chatRoomId ) => {
    const socket = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'], // Force WebSocket transport
      });
      console.log("werkt");
      console.log(chatRoomId);
    return (
        <div className='chatBox'>
        <div className='chatContainer'>
            <Chat socket={socket}/>
        </div>
        </div>

    );
};

export default ChatContainer;
