import React, { useEffect, useState } from 'react';
import Chat from './chat/ChatContainer.tsx';
import { WebSocketChat } from './chat/Chat.tsx';
import io from 'socket.io-client';
import { PostMessage, PostUser } from './utils/PostRequest.tsx';
import ChatContainer from './chat/ChatContainer.tsx';
import { ChatRoomContainer } from './chatroom/ChatRoomContainer.tsx';

const App = () => {

    const urlMessages = 'http://localhost:3000/chatMessages';
    const urlUser = 'http://localhost:3000/users';
    const [localUserId, setLocalUserId] = useState(() => {
        const savedValue = localStorage.getItem("userId");
        return savedValue ? JSON.parse(savedValue) : 1;
    })

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(localUserId));
        setLocalUserId(1);
    }, [localUserId]);

    const socket1 = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'],
      });
    //   const chatRoomId = ChatRoomSingleton.getInstance();
    console.log('local')


    console.log(localUserId);

    // const user

    return (
        <div>
            <ChatRoomContainer userId={localUserId}/>


            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={localUserId} chatRoomId={1} /> {}

            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>

        </div>
    );
};

export default App;
