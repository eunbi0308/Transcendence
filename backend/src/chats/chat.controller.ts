import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { AppService } from '../app.service';

@Controller('chats') // Base route for the chat resource
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly appService: AppService, // Inject AppService
    ) {}
    @Post()
    async create(@Body('message') message: string): Promise<Chat> {
        return this.chatService.createChat(message);
    }

    @Get(':id')
    async getChatwithId(@Param('id') id: string) {
        return this.chatService.findOne(id);
    }

    @Get('hallo')
    async findAll(): Promise<{ message: string }> {
        return { message: this.appService.getHello() };
    }
}
