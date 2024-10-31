import React, { useState } from "react";
import { PostChatRoom } from "./PostRequest.tsx";
import { ChatRoomList } from "./ChatRoomList.tsx";

export const ChatRoomContainer = () => {
    const [chatRoomId, setChatRoomId] = useState<number | undefined>(undefined);

    // Function to update the chatRoomId
    const handleChatRoomChange = (newId: number) => {
        setChatRoomId(newId);
        console.log(chatRoomId);
    };

    return (
        <div className="chatRoomBox">
            <ChatRoomList chatRoomId={chatRoomId} onChatRoomChange={handleChatRoomChange} />
            <PostChatRoom url={'http://localhost:3000/chatroom'} type={'public'} />
        </div>
    );
};
