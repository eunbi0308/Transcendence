import React from "react";
import '../css/Chatroom.css';
import { useFetchRequest } from "../utils/FetchRequest.tsx";

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

interface ChatRoomListProps {
    chatRoomId: number | null;
    onChatRoomChange: (newId: number) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRoomId, onChatRoomChange }) => {
    const url = 'http://localhost:3000/chatroom';
    const { data: chatRooms, error, loading } = useFetchRequest<ChatRoom[]>(url);

    const changeChatRoom = (newId: number) => {
        onChatRoomChange(newId);
        console.log("Chat Room Changed to ID:", newId);
    };

    console.log("Current Chat Room ID:", chatRoomId);
    return (
        <div>
            <ul className="rooms">
                {Array.isArray(chatRooms) ? (
                    chatRooms.map((chatroom, index) => (
                        <div key={index} className="node" onClick={() => changeChatRoom(chatroom.id)}>
                            <li>{chatroom.title}</li>
                            <li>{chatroom.chat_room_type}</li>
                        </div>
                    ))
                ) : (
                    <p>No chatRooms found.</p>
                )}
            </ul>
        </div>
    );
};
