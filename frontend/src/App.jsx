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
        return savedValue !== null ? JSON.parse(savedValue) : 1;
    });
    

    useEffect(() => {
        localStorage.setItem('userId', JSON.stringify(localUserId));
        setLocalUserId(1);
    }, [localUserId]);


    console.log("app --> " + localUserId);

    // const user
    console.log("App " + localUserId);
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
