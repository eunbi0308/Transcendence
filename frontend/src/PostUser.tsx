import React, { useState } from 'react';
import axios from 'axios';

const PostUser = ({url}) => {
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
export default PostUser;


// prompt
// - nickname
// - email
//
//
