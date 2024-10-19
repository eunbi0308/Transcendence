import React, { useState } from 'react';
import axios from 'axios';

const PostChatRoom = ({ url, type }) => {
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

export default PostChatRoom;
