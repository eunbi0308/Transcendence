import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Delete,
  } from '@nestjs/common';
  import { CreateChatMessageDto } from './dto/create-chat_message.dto';
  import { UpdateChatMessageDto } from './dto/update-chat_message.dto';
  import { ChatMessage } from './chat_message.entity';
  import { ChatMessagesService } from './chat_messages.service';
  
  @Controller('chatMessages')
  export class ChatMessagesController {
    constructor(private readonly chatMessagesService: ChatMessagesService) {}
  
    @Post()
    async create(
        @Body() createChatMessageDto: CreateChatMessageDto,
    ) {
        try {
            await this.chatMessagesService.create(
                createChatMessageDto,
            );

            return {
                success: true,
                message: 'ChatMessage Created Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Get()
    async findAll() {
        try {
            const data =
                await this.chatMessagesService.findAll();
            return {
                success: true,
                data,
                message: 'ChatMessage Fetched Successfully',
            };
        } catch (error) {
            return {
                sucess: false,
                message: error.message,
            };
        }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const data = await this.chatMessagesService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'ChatMessage Fetched Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChatMessageDto: UpdateChatMessageDto,
    ) {
        try {
            await this.chatMessagesService.update(
                +id,
                updateChatMessageDto,
            );
            return {
                success: true,
                message: 'ChatMessage Updated Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.chatMessagesService.remove(+id);
            return {
                success: true,
                message: 'ChatMessage Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }