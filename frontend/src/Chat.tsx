import React from 'react';
import './App.css';
import { useFetchRequest } from './FetchRequest.tsx';
import { ChatUser } from './ChatUser.tsx'
import { ChatContact } from './ChatContact.tsx';
import { ChatMessages } from './ChatMessages.tsx';
import { WebSocketChat } from './Websocket.tsx';
import io from 'socket.io-client';

const Chat = ( chatRoomId ) => {
    const socket = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'], // Force WebSocket transport
      });

    return (
        <div className='chatBox'>
        <div className='chatContainer'>
            <WebSocketChat socket={socket}/>
        </div>
        </div>

    );
};

export default Chat;
