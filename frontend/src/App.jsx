import React from 'react';
import Chat from './ChatContainer.tsx';
import { WebSocketChat } from './Chat.tsx';
import io from 'socket.io-client';
import { PostMessage, PostUser } from './PostRequest.tsx';
import ChatContainer from './ChatContainer.tsx';
import { ChatRoomContainer } from './ChatRoomContainer.tsx';

const App = () => {
    const urlMessages = 'http://localhost:3000/chatMessages';
    const urlUser = 'http://localhost:3000/users';
    const socket1 = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'],
      });
    //   const chatRoomId = ChatRoomSingleton.getInstance();

    
//   console.log(socket1);

    // const user

    return (
        <div>
            <ChatRoomContainer/>


            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={2} chatRoomId={1} /> {}

            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>

            <ChatContainer/>
        </div>
    );
};

export default App;
