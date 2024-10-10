import React from 'react';

interface ChatUserProps {
  items: string[];
}

const ChatUser: React.FC<ChatUserProps> = ({ items }) => {
  return (
    <div className="chatUser">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>User:</strong> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatUser;
