import React, { useState, useEffect } from "react";
import { PostChatRoom } from "../utils/PostRequest.tsx";
import { ChatRoomList } from "./ChatRoomList.tsx";
import ChatContainer from "../chat/ChatContainer.tsx";
import { handleSubmitParticipant } from "../utils/PostRequest.tsx"

enum chat_room_types {
    Public = "public",
    Protected = "protected",
    Private = "private"
}

interface ChatRoom {
    title: string;
    id: number;
    chat_room_type: chat_room_types;
    password: string;
}

export const ChatRoomContainer = ( userId ) => {
    const [chatRoomId, setChatRoomId] = useState(() => {
        try {
            const savedId = localStorage.getItem('chatRoomId');
            // If there's no value in localStorage, use a default value (e.g., 0)
            return savedId ? JSON.parse(savedId) : 1;
        } catch (error) {
            console.error('Failed to parse chatRoomId from localStorage:', error);
            return 0; // Default value
        }
    });

    useEffect(() => {
        if (chatRoomId !== null) {
            localStorage.setItem('chatRoomId', JSON.stringify(chatRoomId));
        }
    }, [chatRoomId]);

    const addParticipant = async (userId : number, chatRoomId : number) => {
        const res = await handleSubmitParticipant('http://localhost:3000/chatParticipants/${chatRoomId}/join/${userId}',userId, chatRoomId);
        console.log("deze fout" + res);
    }

    const handleChatRoomChange = (newChatRoom: ChatRoom) => {
        localStorage.setItem('chatRoomId', JSON.stringify(newChatRoom?.id));
        setChatRoomId(newChatRoom?.id);
        addParticipant(userId, 1)
        console.log("Chat room ID changed to:", newChatRoom?.id);
    };
    
    return (
        <div className="chatRoomBox">
            <ChatRoomList chatRoomId={chatRoomId} onChatRoomChange={handleChatRoomChange} />
            <ChatContainer chatRoomId={chatRoomId} userId={userId}/>
            
            <PostChatRoom url={'http://localhost:3000/chatroom'}/>
        </div>
    );
}; 
