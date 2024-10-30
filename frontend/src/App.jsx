import React from 'react';
import { PostChatRoom, PostUser, PostMessage } from './PostRequest.tsx';
import Chat from './Chat.tsx';
import { WebSocketChat } from './Websocket.tsx';
import io from 'socket.io-client';


const App = () => {
    const urlMessages = 'http://localhost:3000/chatMessages';
    const urlChatRoom = 'http://localhost:3000/chatroom';
    const urlUser = 'http://localhost:3000/users';
    const socket1 = io('ws://localhost:3000', {
        reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
        transports: ['websocket'], // Force WebSocket transport
      });
    
//   console.log(socket1);

    // const user

    return (
        <div>
            <h1>Post a ChatRoom to the server</h1>
            <PostChatRoom url={urlChatRoom} type={"public"}/>
            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>

            <Chat chatRoomId={1}/>
            <WebSocketChat socket={socket1}/>
            <h1>Post a Message from the User</h1>
            <PostMessage url={urlMessages} userId={1} chatRoomId={1} /> {}
            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={2} chatRoomId={1} /> {}
        </div>
    );
};

export default App;
