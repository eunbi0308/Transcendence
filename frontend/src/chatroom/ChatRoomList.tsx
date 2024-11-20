import React, { useState } from "react";
import '../css/Chatroom.css';
import { useFetchRequest } from "../utils/FetchRequest.tsx";
import { PasswordPrompt } from "./PasswordPrompt.tsx";

enum chat_room_types {
    Public = "public",
    Protected = "protected",
    Private = "private"
}
interface Participant {
    user_id: number;
}

interface ChatRoom {
    title: string;
    id: number;
    chat_room_type: chat_room_types;
    password: string;
    chatParticipants: Participant[];
}


interface ChatRoomListProps {
    chatRoomId: number | null;
    userId:  number;
    onChatRoomChange: (newChatRoom: ChatRoom) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRoomId, onChatRoomChange, userId }) => {
    const url = 'http://localhost:3000/chatroom/includeParticipant';
    const { data: chatRooms, error, loading } = useFetchRequest<ChatRoom[]>(url);
    const [askPassword, setAskPassword] = useState<Boolean>(false);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const { data: activeParticipant, error2, loading2 } = useFetchRequest<Participant>(`http://localhost:3000/chatParticipants/${chatRoomId}/find/${userId}`);


    const changeChatRoom = (newId: number) => {
        const chatRoom = chatRooms?.find((room) => room.id === newId) ?? null;
        setSelectedChatRoom(chatRoom);
        if (chatRoom?.chat_room_type === chat_room_types.Protected && activeParticipant == null) {
            setAskPassword(true);
        } else {
            // setAskPassword(false);
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
    const filterChatRooms = chatRooms?.filter((room) => {
        console.log("Processing Room:", room, userId + " userId");
        
        if (room.chat_room_type !== chat_room_types.Private) {
            console.log(`Including non-private room: ${room.title}`);
            return true;
        }
    
        // console.log(`Checking participants for private room: ${room.title}`);
        console.log("asdf" , room.chatParticipants);
        const isActive = room.chatParticipants?.some((chatParticipants) => {
            console.error("Participant user_id:", chatParticipants.user_id);
            console.error("Current userId:", userId);
            return chatParticipants.user_id.toString() === userId;
        });
    
        console.log(
            `Private room: ${room.title}, Active Participant: ${isActive}`
        );
    
        return isActive;
    });
    
    
    console.log(filterChatRooms);
    return (
        <div>
            <div className="PromptContainer">
                {askPassword && <PasswordPrompt onSubmit={handlePasswordSubmit} />}
            </div>
            <ul className="rooms">
                {Array.isArray(filterChatRooms) ? (
                    filterChatRooms.map((chatroom, index) => (
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
