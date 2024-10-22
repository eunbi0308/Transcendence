import React from 'react';
import './App.css';
import { useFetchRequest } from './FetchRequest.tsx';

interface Message {
    content: string;
    // Add other fields if necessary
}

const Chat = () => {
    const url = 'http://localhost:3000/chatMessages';
    const { data: messages, error, loading } = useFetchRequest<Message[]>(url);

    // Check if loading or error
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='chatContainer'>
            <div className='chatUser'>
                <ul>
                    {/* Ensure messages is an array before mapping */}
                    {Array.isArray(messages) ? (
                        messages.map((message, index) => (
                            <li key={index}>
                                {message.content}
                                {/* <p>test</p> */}
                            </li>
                        ))
                    ) : (
                        <p>No messages found.</p>
                    )}
                </ul>
            </div>
            <div className='chatContact'></div>
        </div>
    );
};

export default Chat;
