// Chat.tsx
import React from 'react';
import './App.css';
import { useFetchRequest } from './FetchRequest.tsx';
import { Message } from './../../backend/src/chat_messages/dto/create-chat_message.dto.ts'

const Chat = () => {
    const url = 'http://localhost:3000/chatMessages';
    const { data: messages, error, loading } = useFetchRequest(url);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='chatContainer'>
            <div className='chatUser'>
                <ul>
                    {Object.values(messages).map((message, index) => (
                    <li key={index}>
                        {message.content}
                        <p>test</p>
                    </li>
                    ))}
                </ul>
            </div>
            <div className='chatContact'></div>
        </div>
    );
};

export default Chat;
