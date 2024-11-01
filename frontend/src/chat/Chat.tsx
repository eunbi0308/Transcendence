import { useEffect, useState } from 'react';
import { useFetchRequest} from '../utils/FetchRequest.tsx';
import { handleSubmitMessages } from '../utils/PostRequest.tsx';

interface oldMessage {
  content: string;
  user_id: number;
}

const addStyle = ( userId: number ) => {
  return (userId == 1 ? 'chatUser' : 'chatContact');
}

export const Chat = ({ socket, id }) => {
  const url = `http://localhost:3000/chatMessages/${id}`;
  console.log('chat werkt');
  const { data: fetchedMessages, error, loading } = useFetchRequest<oldMessage[]>(url);
    const [messages, setMessages] = useState<oldMessage[]>(fetchedMessages || []); 
    const [input, setInput] = useState('');
    
    // console.log(chatRoomId);
    useEffect(() => {
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    }, [fetchedMessages]);
    
    useEffect(() => {
      socket.on('connect', () => {
        console.log('WebSocket connected');
      });

      socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }, []);

    const handleSendMessage = () => {
      if (input.trim()) {
        const newMessage = { content: input, user_id: 1 };
        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        handleSubmitMessages('http://localhost:3000/chatMessages', input, 1, id);
        console.log("added");
        setInput('');
      }
    };

    if (loading) {
      return <div>Loading messages...</div>; // Loading state
    }
  
    if (error) {
      return <div>Error loading messages: {error.message}</div>; // Error handling
    }

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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSendMessage}>Send</button>
      </div>
    );
  };
  
  
  