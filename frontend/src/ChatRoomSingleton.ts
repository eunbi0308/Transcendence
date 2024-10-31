class ChatRoomSingleton {
    private static instance: ChatRoomSingleton;
    public value: number;

    private constructor() {
        this.value = -1; // Initialize to your desired value
    }

    public static getInstance(): ChatRoomSingleton {
        if (!ChatRoomSingleton.instance) {
            ChatRoomSingleton.instance = new ChatRoomSingleton();
        }
        return ChatRoomSingleton.instance;
    }
}

export default ChatRoomSingleton;
