import React, { useEffect, useState } from 'react';
import Chat from './chat/ChatContainer.js';
// import { WebSocketChat } from './chat/Chat.js';
import io from 'socket.io-client';
import { PostMessage } from './utils/PostRequest';
import { ChatRoomContainer } from './chatroom/ChatRoomContainer';
import { PostUser } from './utils/PostRequest';
// import Chat from './Chat.tsx';
// import Game from './Game/Game.tsx';
// import MatchMaking from './Game/Matchmaking.js';
import './Game/Matchmaking.css';

const App = () => {
    const urlMessages = 'http://localhost:3000/chatMessages';
    // const urlChatRoom = 'http://localhost:3000/chatroom';
    const urlUser = 'http://localhost:3000/users';
    const [localUserId, setLocalUserId] = useState(() => {
        const savedValue = localStorage.getItem("userId");
        return savedValue ? JSON.parse(savedValue) : 1;
    })

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(localUserId));
        setLocalUserId(1);
    }, [localUserId]);


    console.log(localUserId);

    // const user

    return (
        <div>
            <ChatRoomContainer userId={localUserId}/>


            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={localUserId} chatRoomId={1} /> {}

            <h1>Post a User to the server</h1>
            <PostUser url={urlUser} userId={localUserId}/>
{/* 
            <Chat chatRoomId={1}/>

            <h1>Post a Message from the User</h1>
            <PostMessage url={urlMessages} userId={1} chatRoomId={1} /> {}
            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={2} chatRoomId={1} /> {} */}
            {/* <MatchMaking/> */}
        </div>
    );
};

export default App;

