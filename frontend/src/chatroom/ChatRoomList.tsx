import React, { useState } from "react";
import '../css/Chatroom.css';
import { useFetchRequest } from "../utils/FetchRequest";
import { useState } from "react";
import { PasswordPrompt } from "./PasswordPrompt";

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

interface ChatRoomListProps {
    chatRoomId: number | null;
    onChatRoomChange: (newChatRoom: ChatRoom) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRoomId, onChatRoomChange }) => {
    const url = 'http://localhost:3000/chatroom';
    const { data: chatRooms, error, loading } = useFetchRequest<ChatRoom[]>(url);
    const [askPassword, setAskPassword] = useState<Boolean>(false);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);

    const changeChatRoom = (newId: number) => {
        const chatRoom = chatRooms?.find((room) => room.id === newId) ?? null;
        
        setSelectedChatRoom(chatRoom);
        if (chatRoom?.chat_room_type === chat_room_types.Protected) {
            setAskPassword(true);
        } else {
            onChatRoomChange(selectedChatRoom);
        }
    };

    const validatePassword = async (password: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(password === selectedChatRoom?.password);
            }, 1000);
        });
    };

    const handlePasswordSubmit = async (password: string) => {
        console.log(password + " real password ---> " + selectedChatRoom?.password);
        const isValid = await validatePassword(password);
        if (isValid) {
            onChatRoomChange(selectedChatRoom);
            console.log("Chat Room Changed to ID:", selectedChatRoom?.id);
        } else {
            console.log("Wrong password");
        }
        setAskPassword(false);
    };

    return (
        <div>
            <div className="PromptContainer">
                {askPassword && <PasswordPrompt onSubmit={handlePasswordSubmit} />}
            </div>
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
