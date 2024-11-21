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
        // setLocalUserId(1);
    }, [localUserId]);

    const changeUserId = (e) => {
        e.preventDefault();
        const newUserId = e.target.elements.userId.value;
        setLocalUserId(newUserId);
    };

    return (
        <div>
            <ChatRoomContainer userId={localUserId}/>


            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={localUserId} chatRoomId={1} /> {}

            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>
            
            <form onSubmit={changeUserId}>
                <input
                    type="text"
                    name="userId" // Name to identify the input field
                    value={localUserId}
                    onChange={(e) => setLocalUserId(e.target.value)} // Update the local state
                    placeholder="Enter new user ID"
                    required
                />
                <button type="submit">Change User ID</button>
            </form>
  
            </div>
    );
};

export default App;
