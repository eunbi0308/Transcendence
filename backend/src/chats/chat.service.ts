import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
    ) {}

    
    async createChat(message: string): Promise<Chat> {
        const newChat = this.chatRepository.create({ message });
        console.log("Chat posted");
        return this.chatRepository.save(newChat);
    }

    async getAllChats(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findOne(id: string): Promise<Chat | undefined> {
        // Convert id from string to number
        const numericId = parseInt(id, 10);
        
        if (isNaN(numericId)) {
            throw new Error('Invalid ID format'); // Handle invalid ID format
        }
    
        return this.chatRepository.findOne({ where: { id: numericId } });
    }
    
}