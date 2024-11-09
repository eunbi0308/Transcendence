import React, { useState, useEffect } from "react";
import { PostChatRoom } from "../utils/PostRequest.tsx";
import { ChatRoomList } from "./ChatRoomList.tsx";
import ChatContainer from "../chat/ChatContainer.tsx";

export const ChatRoomContainer = ( userId ) => {
    const [chatRoomId, setChatRoomId] = useState(() => {
        const savedId = localStorage.getItem('chatRoomId');
        return savedId ? JSON.parse(savedId) : null;
    });

    useEffect(() => {
        if (chatRoomId !== null) {
            localStorage.setItem('chatRoomId', JSON.stringify(chatRoomId));
        }
    }, [chatRoomId]);

    const handleChatRoomChange = (newId: number) => {
        localStorage.setItem('chatRoomId', JSON.stringify(newId));
        setChatRoomId(newId);
        console.log("Chat room ID changed to:", newId);
    };
    
    // console.log()
    return (
        <div className="chatRoomBox">
            <ChatRoomList chatRoomId={chatRoomId} onChatRoomChange={handleChatRoomChange} />
            <ChatContainer chatRoomId={chatRoomId} userId={userId}/>
            
            <PostChatRoom url={'http://localhost:3000/chatroom'}/>
        </div>
    );
}; 
