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

export const Chat = ({ socket, id, userId }) => {
  const url = `http://localhost:3000/chatMessages/${id.id}`;
  const { data: fetchedMessages, error, loading } = useFetchRequest<oldMessage[]>(url);
    const [messages, setMessages] = useState<oldMessage[]>(fetchedMessages || []); 
    const [input, setInput] = useState('');


    useEffect(() => {
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    }, [fetchedMessages]);
    
    useEffect(() => {
      console.log("regesterid");
      socket.on('connect', () => {
        console.log('WebSocket connected');
      });
    
      socket.on("connect_error", (err) => {
        console.log(err.message);
      
        console.log(err.description);
      
        console.log(err.context);
        console.log(id.title);
      });
    
      socket.emit('joinRoom', id.title);
    
      const handleReceiveMessage = (message) => {
        console.log("Received message:", message);
        // setMessages((prevMessages) => [...prevMessages, message]);
      };
    
      socket.on('receiveMessage', handleReceiveMessage);
    
      return () => {
        // socket.emit('leaveRoom', id.title);
        // socket.off('receiveMessage', handleReceiveMessage);
      };
    }, [id.title]);
    console.log('dexe');
    console.log(id.title);
    const handleSendMessage = () => {
      if (input.trim()) {
        const newMessage = { content: input, user_id: userId.userId, roomTitle: id.title };
        socket.emit('sendMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        console.log(input);
        handleSubmitMessages('http://localhost:3000/chatMessages', input, userId.userId, id.id);
        console.log(id);
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
          <div className='formMessages'>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              />
            <button onClick={handleSendMessage}>Send</button>
            </div>
      </div>
    );
  };
  
  
  