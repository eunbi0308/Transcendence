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
  import { ChatMessagesService } from './chat_messages.service';
  
  @Controller('chatMessages')
  export class ChatMessagesController {
    constructor(private readonly chatMessagesService: ChatMessagesService) {}
    
    @Post()
    async create(
        @Body() createChatMessageDto: CreateChatMessageDto,
    ) {
        console.log("messages recived");
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
            console.log("Message findAll get request");
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
            const data = await this.chatMessagesService.findByChatRoomId(
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
  
    @Delete(':chatRoomId')
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


  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string){
      try {
          const messages = await this.chatMessagesService.findByUserId(+userId); // Convert string to number
          return {
              success: true,
              data: messages,
              message: 'Messages fetched successfully.',
          };
      } catch (error) {
          return {
              success: false,
              message: error.message,
          };
      }
  }


    @Get('chatRoom/:chatRoomId/user/:userId')
    async findAllByUserAndChatRoom(
        @Param('chatRoomId') chatRoomId: string,
        @Param('userId') userId: string,
    ) {
        try {
            const messages = await this.chatMessagesService.findByUserIdAndChatRoomId(
                +userId,
                +chatRoomId,
            );
            return {
                success: true,
                data: messages,
                message: 'Messages fetched successfully.',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}