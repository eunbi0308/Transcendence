import React from 'react';
import { PostUser } from './PostRequest.tsx';
// import Chat from './Chat.tsx';
// import Game from './Game/Game.tsx';
import MatchMaking from './Game/Matchmaking.tsx';
import './Game/Matchmaking.css';

const App = () => {
    // const urlMessages = 'http://localhost:3000/chatMessages';
    // const urlChatRoom = 'http://localhost:3000/chatroom';
    const urlUser = 'http://localhost:3000/users';
    // const user

    return (
        <div>
             {/* <h1>Post a ChatRoom to the server</h1>
            <PostChatRoom url={urlChatRoom} type={"public"}/> */}
            <h1>Post a User to the server</h1>
            <PostUser url={urlUser}/>
{/* 
            <Chat chatRoomId={1}/>

            <h1>Post a Message from the User</h1>
            <PostMessage url={urlMessages} userId={1} chatRoomId={1} /> {}
            <h1>Post a Message from the contact/guest</h1>
            <PostMessage url={urlMessages} userId={2} chatRoomId={1} /> {} */}
            <MatchMaking/>
        </div>
    );
};

export default App;

