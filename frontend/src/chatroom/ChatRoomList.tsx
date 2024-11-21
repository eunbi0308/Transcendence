import React, { useEffect, useState } from "react";
import '../css/Chatroom.css';
import { useFetchRequest, useFetchRequestDep } from "../utils/FetchRequest.tsx";
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
    chatRooms: ChatRoom[];
    chatRoomId: number | null;
    userId:  number;
    onChatRoomChange: (newChatRoom: ChatRoom) => void;
    askPassword: boolean;
    setAskPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({chatRooms ,  chatRoomId, onChatRoomChange, userId, askPassword, setAskPassword }) => {
    // const url = 'http://localhost:3000/chatroom/includeParticipant';
    // const { data: chatRooms, error, loading } = useFetchRequest<ChatRoom[]>(url);
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const [newIdScope, setNewIdScope] = useState<number | null>(null);  // Use state to store the newIdScope


    const CheckIfActive = (chatParticipants: Participant[] | undefined): boolean => {
        return chatParticipants?.some((participant) => {
            console.error("Participant user_id:", participant.user_id);
            console.error("Current userId:", userId);
            return participant.user_id.toString() === userId.toString();
        }) ?? false; // Default to `false` if `chatParticipants` is undefined or empty
    };

    const changeChatRoom = (newId: number) => {
        const chatRoom = chatRooms?.find((room) => room.id === newId) ?? null;
        console.log("chatRoom -->", chatRoom);
        setNewIdScope(newId);
        setSelectedChatRoom(chatRoom);
        const value = CheckIfActive(chatRoom?.chatParticipants);
        console.log("value -->", value);

        if (chatRoom?.chat_room_type === chat_room_types.Protected && value === false) {
            setAskPassword(true);
        } else {
            onChatRoomChange(chatRoom);
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
        const chatRoom = chatRooms?.find((room) => room.id === newIdScope) ?? null;  // Use the newIdScope state to find the chat room
        console.log("chatroom -->", newIdScope);

        console.log(password + " real password ---> " + selectedChatRoom?.password);
        const isValid = await validatePassword(password);
        if (isValid) {
            onChatRoomChange(chatRoom);
        } else {
            console.log("Wrong password");
        }
        setAskPassword(false);
    };

    const filterChatRooms = chatRooms?.filter((room) => {
        if (room.chat_room_type !== chat_room_types.Private) {
            return true;
        }

        const isActive: boolean = CheckIfActive(room.chatParticipants);
        return isActive;
    });

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
