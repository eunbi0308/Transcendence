import React from "react";

interface oldMessage {
    content: string;
    user_id: number;
  }

const addStyle = ( userId: number ) => {
    return (userId == 1 ? 'chatUser' : 'chatContact');
  }

 export const ChatNode = ({ message }: { message: oldMessage }) => {
    return (
      <li>
        {message.content}
      </li>
    );
  };
  