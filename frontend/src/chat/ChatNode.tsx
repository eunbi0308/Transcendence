import React from "react";

interface oldMessage {
    content: string;
    user_id: number;
  }

interface participants
{
  user_id: number;
}

const addStyle = ( userId: number ) => {
    return (userId == 1 ? 'chatUser' : 'chatContact');
  }

// ChatNode.tsx
export const ChatNode = ({
  message,
  user,
  loading,
  userId,
}: {
  message: oldMessage;
  user: Participants[];
  loading: boolean;
  userId: number;
}) => {
  if (loading) {
    return <li>Loading user data...</li>;
  }

  if (!user || user.length === 0) {
    return <li>User not found</li>;
  }

  return (
    <li>
      {message.content} - Sent by: {user[0]?.user_id}
    </li>
  );
};

  