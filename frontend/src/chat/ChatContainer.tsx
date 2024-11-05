import React from 'react';
import '../css/ChatBox.css';
import { useFetchRequest} from '../utils/FetchRequest.tsx';
import { Chat } from './Chat.tsx';
import io from 'socket.io-client';

const ChatContainer = ({ chatRoomId, userId }) => {
    // const chatRoomId = localStorage.getItem('chatRoomId');
const socket = io('localhost:3000/ws', {
  reconnectionAttempts: 5,
  transports: ['websocket'],
});
      console.log('werkt in container');
    return (
        <div className='chatBox'>
            <div className='chatContainer'>
                <Chat socket={socket} id={chatRoomId} userId={userId}/>
            </div>
        </div>

    );
};

export default ChatContainer;
