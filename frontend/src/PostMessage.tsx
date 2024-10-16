import React, { useState } from 'react';
import axios from 'axios';

const PostMessage = ({ url, userId, chatRoomId }) => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(url, {
                content: message, // This maps to the 'content' field in your entity
                user_id: userId,  // Make sure to pass the user ID
                chat_room_id: chatRoomId // Make sure to pass the chat room ID
            });

            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
            setResponse({ error: error.response ? error.response.data : 'Failed to send message' });
        }

        setMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                    required
                />
                <button type="submit">Send Message</button>
            </form>

            {response && (
                <div>
                    <h3>Server Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PostMessage;
