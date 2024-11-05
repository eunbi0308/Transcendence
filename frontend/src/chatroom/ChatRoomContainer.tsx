import React, { useState, useEffect } from "react";
import { PostChatRoom } from "../utils/PostRequest.tsx";
import { ChatRoomList } from "./ChatRoomList.tsx";
import ChatContainer from "../chat/ChatContainer.tsx";

enum chat_room_types {
    Public = "public",
    Protected = "protected",
    Private = "private"
}

interface ChatRoom {
    title: string,
    id: number,
    chat_room_type: chat_room_types,
}

export const ChatRoomContainer = ( userId ) => {
    const [chatRoomId, setChatRoomId] = useState(() => {
        const savedId = localStorage.getItem('chatRoomId');
        return savedId ? JSON.parse(savedId) : ''; // or a default value
    });

    useEffect(() => {
        if (chatRoomId !== null) {
            localStorage.setItem('chatRoomId', JSON.stringify(chatRoomId));
        }
    }, [chatRoomId]);

    const handleChatRoomChange = (chatRoom: ChatRoom) => {
        localStorage.setItem('chatRoomId', JSON.stringify(chatRoom));
        setChatRoomId(chatRoom);
        console.log("Chat room ID changed to:", chatRoom);
    };
    
    // console.log()
    return (
        <div className="chatRoomBox">
            <ChatRoomList onChatRoomChange={handleChatRoomChange} />
            <ChatContainer chatRoomId={chatRoomId} userId={userId}/>
            
            <PostChatRoom url={'http://localhost:3000/chatroom'} type={'public'} />
        </div>
    );
};
