import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail
 } from 'class-validator';
import { chat_room_types } from '../chat_room.entity';

export class CreateChatRoomDto {
    @ApiProperty({ description: 'ChatRoom avatar' })
    @IsOptional()
    avatar: Buffer;
  
    @ApiProperty({ description: 'ChatRoom nickname' })
    @IsNotEmpty()
    @IsString()
    nickname: string;
  
    @ApiProperty({ description: 'Second authentication code' })
    @IsOptional()
    @IsNumber()
    second_auth_code: number;
  
    @ApiProperty({ description: 'Second authentication email' })
    @IsEmail()
    second_auth_email: string;
  
    @ApiProperty({ description: 'Ladder level' })
    @IsNumber()
    ladder_level: number;
  
    @ApiProperty({ description: 'ChatRoom types' })
    @IsEnum(chat_room_types)
    chat_room_type: chat_room_types;
}