import React from 'react';
import PostMessage from './PostMessage.tsx';

const App = () => {
    const apiUrl = 'http://localhost:3000/chatMessages';

    return (
        <div>
            <h1>Send a Message to the Server</h1>
            <PostMessage url={apiUrl} userId={0} chatRoomId={0} /> {}
        </div>
    );
};

export default App;
