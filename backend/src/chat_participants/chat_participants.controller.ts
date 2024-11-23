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
    async addParticipantToChatroom(
        @Param('chatRoomId') chatRoomId: number,
        @Param('userId') userId: number,
        @Body() body: { user_id: number, chat_room_id: number },
      )
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

    @Get(':chatRoomId/find/:userId')
    async findParticipantChatRoomUserId(
        @Param('chatRoomId') chatRoomId: number,
        @Param('userId') userId: number,
        @Body() body: { user_id: number, chat_room_id: number },
      )
    {
        try {
            const data = await this.chatParticipantsService.findByUserIdAndChatRoom(
                +chatRoomId,
                +userId,
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

    @Get(':chatRoomId/find')
    async findParticipantByChatRoom(
        @Param('chatRoomId') chatRoomId: number,
        @Body() body: { user_id: number, chat_room_id: number },
      )
    {
        try {
            const data = await this.chatParticipantsService.findByChatRoomId(
                +chatRoomId,
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
  
    @Delete(':chatRoomId/delete/:id')   
    async remove(@Param('id') userId: string
    ,@Param('chatRoomId') chatRoomId: string
) {
        try {
            await this.chatParticipantsService.remove(
                +chatRoomId,
                +userId
            );
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