import React from 'react';
import './css/App.css';
import { useFetchRequest} from './FetchRequest.tsx';

interface Message {
    content: string;
    user_id: number;
}

const addStyle = ( userId: number ) => {
    return (userId == 1 ? 'chatUser' : 'chatContact');
}

export const ChatMessages = (chatRoomId) => {
    const url = `http://localhost:3000/chatMessages`;
    const { data: messages, error, loading } = useFetchRequest<Message[]>(url);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ul className='chatMessages'>
                {Array.isArray(messages) ? (
                    messages.map((message, index) => (
                        <li key={index} className={addStyle(message.user_id)}>
                            {message.content}
                        </li>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </ul>
        </div>
    );
};