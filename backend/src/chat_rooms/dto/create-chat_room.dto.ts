import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, IsDate
 } from 'class-validator';
import { chat_room_types } from '../chat_room.entity';

export class CreateChatRoomDto {
    @ApiProperty({ description: 'ChatRoom title' })
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'ChatRoom password' })
    @IsOptional()
    @IsString()
    password: string;
  
    @ApiProperty({ description: 'Creation date' })
    // @IsNotEmpty()
    // @IsDate()
    creation_date: Date;

    @ApiProperty({ description: 'ChatRoom types' })
    @IsEnum(chat_room_types)
    @IsOptional()
    chat_room_type: chat_room_types;
}