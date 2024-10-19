import React, { useState } from 'react';
import axios from 'axios';

export const PostUser = ({url}) => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url, {
                nickname: name,
                second_auth_email: mail,
            });
            setResponse(res.data);
        }
        catch (error) {
            console.error('Error:', error);
            setResponse({ error: error.response ? error.response.data : 'Failed to send message' });
        }
        setName('');
        setMail('');
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                {}
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='nickname'
                    required
                />
                {}
                <input 
                    type="text"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    placeholder='mail'
                    required
                />
                <button type='submit'>Post user</button>
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


export const PostChatRoom = ({ url, type }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(password);

        try {
            const res = await axios.post(url, {
                title: name,
                password: password,
            });

            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
            setResponse({ error: error.response ? error.response.data : 'Failed to send message' });
        }

        // Clear the inputs after submission
        setName('');
        setPassword('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input for Name */}
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Add title'
                    required
                />

                {/* Input for Password */}
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Add password (optional)'
                />

                <button type="submit">Send chatroom</button>
            </form>

            {response && (
                <div>
                    <h3>Server Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export const PostMessage = ({ url, userId, chatRoomId }) => {
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