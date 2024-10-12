import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ChatMessage } from 'chat_messages/chat_message.entity';

export class CreateChatMessageDto extends PartialType(ChatMessage){
    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    user_id: DeepPartial<User>;

    @ApiProperty({ description: 'chat_room_id' })
    @IsNumber()
    chat_room_id: DeepPartial<User>;
}