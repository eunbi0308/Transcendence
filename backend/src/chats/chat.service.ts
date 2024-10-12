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
        return this.chatRepository.save(newChat);
    }

    async getAllChats(): Promise<Chat[]> {
        return this.chatRepository.find();
    }
}