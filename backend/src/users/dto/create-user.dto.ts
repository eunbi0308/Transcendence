import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, IsBoolean
 } from 'class-validator';
import { User, user_status } from '../user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto extends PartialType(User)  {
    @ApiProperty({ description: 'User avatar' })
    @IsOptional()
    avatar: Buffer;
  
    @ApiProperty({ description: 'User nickname' })
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @ApiProperty({ description: 'User 42 email' })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({ description: 'Second authentication check' })
    @IsNotEmpty()
    @IsBoolean()
    is_second_auth_done: boolean;
  
    @ApiProperty({ description: 'Second authentication code' })
    @IsOptional()
    @IsNumber()
    second_auth_code: number;
  
    @ApiProperty({ description: 'Second authentication email' })
    @IsNotEmpty()
    @IsEmail()
    second_auth_email: string;
  
    @ApiProperty({ description: 'Ladder level' })
    @IsNumber()
    ladder_level: number;
  
    @ApiProperty({ description: 'User status' })
    @IsEnum(user_status)
    user_status: user_status;
}