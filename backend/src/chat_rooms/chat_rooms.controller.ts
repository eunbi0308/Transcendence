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
  import { CreateChatRoomDto } from './dto/create-chat_room.dto';
  import { UpdateChatRoomDto } from './dto/update-chat_room.dto';
  import { ChatRoom } from './chat_room.entity';
  import { ChatRoomsService } from './chat_rooms.service';
  
  @Controller('chatroom')
  export class ChatRoomsController {
    constructor(private readonly usersService: ChatRoomsService) {}
  
    @Post()
    async create(
        @Body() createChatRoomDto: CreateChatRoomDto,
    ) {
        try {
            await this.usersService.create(
                createChatRoomDto,
            );

            return {
                success: true,
                message: 'ChatRoom Created Successfully',
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
                await this.usersService.findAll();
            return {
                success: true,
                data,
                message: 'ChatRoom Fetched Successfully',
            };
        } catch (error) {
            return {
                sucess: false,
                message: error.message,
            };
        }
    }

    @Get('noPrivate')
    async findAllWithoutPrivate() {
        try {
            const data =
                await this.usersService.findAllWithoutPrivate();
            return {
                success: true,
                data,
                message: 'ChatRoom Fetched Successfully',
            };
        } catch (error) {
            return {
                sucess: false,
                message: error.message,
            };
        }
    }

    @Get('includeParticipant')
    async findAllincludeParticipant() {
        try {
            const data =
                await this.usersService.findAllincludeParticipant();
            return {
                success: true,
                data,
                message: 'ChatRoom Fetched Successfully',
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
            const data = await this.usersService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'ChatRoom Fetched Successfully',
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
        @Body() updateChatRoomDto: UpdateChatRoomDto,
    ) {
        try {
            await this.usersService.update(
                +id,
                updateChatRoomDto,
            );
            return {
                success: true,
                message: 'ChatRoom Updated Successfully',
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
            await this.usersService.remove(+id);
            return {
                success: true,
                message: 'ChatRoom Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }