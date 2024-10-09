import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail
 } from 'class-validator';
import { user_status } from '../chat_room.entity';

export class CreateUserDto {
    @ApiProperty({ description: 'User avatar' })
    @IsOptional()
    avatar: Buffer;
  
    @ApiProperty({ description: 'User nickname' })
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
  
    @ApiProperty({ description: 'User status' })
    @IsEnum(user_status)
    user_status: user_status;
}