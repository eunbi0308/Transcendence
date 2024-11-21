import { useEffect, useState } from 'react';
import { useFetchRequest, useFetchRequestDep} from '../utils/FetchRequest.tsx';
import { handleSubmitMessages } from '../utils/PostRequest.tsx';
import { ChatNode } from './ChatNode.tsx';

interface oldMessage {
  content: string;
  user_id: number;
}

interface Participants {
  user_id : number | null;
  chat_room_id : number | null;
}

const addStyle = ( userId: number ) => {
  return (userId == 1 ? 'chatUser' : 'chatContact');
}

export const Chat = ({ socket, chatRoomId, userId }) => {
  const url = `http://localhost:3000/chatMessages/${chatRoomId}`;
  const { data: fetchedMessages, error, loading } = useFetchRequest<oldMessage[]>(url);
  const { data: activeParticipants, error2, loading2 } = useFetchRequest<Participants[]>(`http://localhost:3000/chatParticipants/${chatRoomId}/find/`)
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
        handleSubmitMessages('http://localhost:3000/chatMessages', input, userId, chatRoomId);
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
                    <div key={index} className={addStyle(userId)}>
                      <ChatNode key={index} message={message} user={activeParticipants?.filter((participant) => participant.user_id == userId)} loading={loading2}/>
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
  
  
  