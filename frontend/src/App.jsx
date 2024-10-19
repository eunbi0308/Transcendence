import React from 'react';
import { PostChatRoom, PostUser, PostMessage } from './PostRequest.tsx';
import Chat from './Chat.tsx';

const App = () => {
    const urlMessages = 'http://localhost:3000/chatMessages';
    const urlChatRoom = 'http://localhost:3000/chatroom';
    const urlUser = 'http://localhost:3000/users';

    return (
        <div>
            <h1>Post a ChatRoom to the server</h1>
            <PostChatRoom url={urlChatRoom} type={"public"}/>
            <h1>Post a Message to the Server</h1>
            <PostMessage url={urlMessages} userId={1} chatRoomId={1} /> {}
            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>
            <Chat/>
        </div>
    );
};

export default App;
