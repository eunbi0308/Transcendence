import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString, } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ChatMessage } from 'chat_messages/chat_message.entity';

export class CreateChatMessageDto extends PartialType(ChatMessage){
    @ApiProperty({ description: 'content' })
    @IsNotEmpty()
    @IsString()
    content: string;
    
    @ApiProperty({ description: 'sent_time' })
    @IsDate()
    @IsNotEmpty()
    sent_time: Date;
    
    @ApiProperty({ description: 'user_id' })
    @IsNotEmpty()
    @IsNumber()
    user_id: DeepPartial<User>;

    @ApiProperty({ description: 'chat_room_id' })
    @IsNotEmpty()
    @IsNumber()
    chat_room_id: DeepPartial<User>;

}