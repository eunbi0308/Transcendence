import React from "react";
import './css/Chatroom.css';
import { useState } from "react";
import { useFetchRequest} from "./FetchRequest.tsx";

enum chat_room_types {
	Public = "public",
	Protected = "protected",
	Private = "private"
}

interface ChatRoom {
    title: string,
    id: number,
    chat_room_type: chat_room_types,
    // type: enum,
}

export var chatRoomId = -1

export const ChatRoomList = () => {
    const url = 'http://localhost:3000/chatroom'
    const { data: chatRooms, error, loading } = useFetchRequest<ChatRoom[]>(url);

    const changeChatRoom = (newId) => {
        chatRoomId = newId;
        console.log(newId);
    }
    return(
        <div>
            <ul className="rooms">
                {Array.isArray(chatRooms) ? (
                    chatRooms.map((chatroom, index) => (
                        <div  key={index} className="node" onClick={() => changeChatRoom(chatroom.id)}>
                            <li >
                                {chatroom.title}
                            </li>
                            <li>
                                {chatroom.chat_room_type}
                            </li>
                        </div>
                    ))
                ) : (
                    <p>No chatRooms found.</p>
                )}
            </ul>
        </div>
    );
}