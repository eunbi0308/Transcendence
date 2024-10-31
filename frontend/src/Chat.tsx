// import React from 'react';
// import './App.css';
// import { useFetchRequest } from './FetchRequest.tsx';
// import { ChatUser } from './ChatUser.tsx'
// import { ChatContact } from './ChatContact.tsx';

// interface Message {
//     content: string;
//     // Add other fields if necessary
// }

// const Chat = ( chatRoomId ) => {
//     const url = 'http://localhost:3000/chatMessages';
//     // const { data: messages, error, loading } = useFetchRequest<Message[]>(url);
//     // const localId = 1;
//     // Check if loading or error
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className='App'>
//         <div className='chatContainer'>
//             <ChatUser />
//             <ChatContact/>
//         </div>
//         </div>

//     );
// };

// export default Chat;
