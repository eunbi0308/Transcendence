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
  import { CreateChatParticipantDto } from './dto/create-chat_participant.dto';
  import { ChatParticipantsService } from './chat_participants.service';
  
  @Controller('chatParticipants')
  export class ChatParticipantsController {
    constructor(private readonly chatParticipantsService: ChatParticipantsService) {}
  
    @Post()
    async create(
        @Body() createChatParticipantDto: CreateChatParticipantDto,
    ) {
        try {
            await this.chatParticipantsService.create(
                createChatParticipantDto,
            );

            return {
                success: true,
                message: 'ChatParticipant Created Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Post(':chatRoomId/join/:userId')
    async addParticipantToChatroom(@Param('chatRoomId') chatRoomId: number, @Param('userId') userId: number)
    {
        return this.chatParticipantsService.addParticipantToChatRoom(chatRoomId, userId);
    }

    @Get()
    async findAll() {
        try {
            const data =
                await this.chatParticipantsService.findAll();
            return {
                success: true,
                data,
                message: 'ChatParticipant Fetched Successfully',
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
            const data = await this.chatParticipantsService.findByChatRoomId(
                +id,
            );
            return {
                success: true,
                data,
                message: 'ChatParticipant Fetched Successfully',
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
            await this.chatParticipantsService.remove(+id);
            return {
                success: true,
                message: 'ChatParticipant Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }