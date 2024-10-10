
import React from 'react';

interface ChatContactProps {
  responses: string[];
}

const ChatContact: React.FC<ChatContactProps> = ({ responses }) => {
  return (
    <div className="chatContact">
      <ul>
        {responses.map((response, index) => (
          <li key={index}>
            <strong>Contact:</strong> {response}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatContact;
