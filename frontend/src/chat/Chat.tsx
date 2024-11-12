import { useEffect, useState } from 'react';
import { useFetchRequest} from '../utils/FetchRequest.tsx';
import { handleSubmitMessages } from '../utils/PostRequest.tsx';
import { ChatNode } from './ChatNode.tsx';

interface oldMessage {
  content: string;
  user_id: number;
}

const addStyle = ( userId: number ) => {
  return (userId == 1 ? 'chatUser' : 'chatContact');
}

export const Chat = ({ socket, id, userId }) => {
  const url = `http://localhost:3000/chatMessages/${id}`;
  console.log('chat werkt MET  ' + userId);
  const { data: fetchedMessages, error, loading } = useFetchRequest<oldMessage[]>(url);
 
    const [messages, setMessages] = useState<oldMessage[]>(fetchedMessages || []); 
    const [input, setInput] = useState('');
    
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

      const handleReceiveMessage = (message) => {
        console.log("!!!!!!!!!!!!");
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('receiveMessage', handleReceiveMessage); 
      return () => {
        socket.off('receiveMessage');
      };
    }, []);

    const handleSendMessage = () => {
      if (input.trim()) {
        const newMessage = { content: input, user_id: userId.userId };
        socket.emit('sendMessage', newMessage);
        handleSubmitMessages('http://localhost:3000/chatMessages', input, userId.userId, id);
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
                    <div key={index} className={addStyle(message.user_id)}>
                      <ChatNode key={index} message={message}/>
                    </div>
                  ))
              ) : (
                  <p>No messages found.</p>
              )}
          </ul>
          <div className='formMessages'>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
      </div>
    );
  };