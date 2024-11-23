import React from "react";
import { deleteItem } from "../utils/DeleteRequest.tsx";

export const KickUser = (chatRoomId, userId) => {
    console.log(userId);
    deleteItem(chatRoomId, userId);
}

export const PromoteUser = (userId) => {
    
}

export const MuteUser = (userId) => {
    
}

export const BlockUser = (userId) => {
    
}