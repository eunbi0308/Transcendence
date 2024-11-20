import React from 'react';
import '../css/ChatBox.css';
import { useFetchRequest} from '../utils/FetchRequest.tsx';
import { Chat } from './Chat.tsx';
import io from 'socket.io-client';

const ChatContainer = ({ chatRoomId, userId }) => {
    // const chatRoomId = localStorage.getItem('chatRoomId');
    const socket = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'], // Force WebSocket transport
      });
    return (
        <div className='chatBox'>
            <div className='chatContainer'>
                <Chat socket={socket} chatRoomId={chatRoomId} userId={userId}/>
            </div>
        </div>

    );
};

export default ChatContainer;
