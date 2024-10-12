import { Controller, Post, Get, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { AppService } from '../app.service';

@Controller('chats') // Base route for the chat resource
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly appService: AppService, // Inject AppService
    ) {}
    // Endpoint to create a new chat message
    @Post()
    async create(@Body('message') message: string): Promise<Chat> {
        return this.chatService.createChat(message); // Calls the service to create a new chat message
    }

    // Endpoint to get all chat messages
    @Get('hallo')
    async findAll(): Promise<{ message: string }> {
        return { message: this.appService.getHello() };
    }
}
