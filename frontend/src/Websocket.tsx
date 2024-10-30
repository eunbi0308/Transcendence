import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const WebSocketChat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (input.trim()) {
      socket.emit('sendMessage', { message: input });
      setInput('');
    }
  };

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{msg.message}</div>
      ))}
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
