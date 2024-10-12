import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Blocked } from 'blockeds/blocked.entity';

export class CreateBlockedDto extends PartialType(Blocked) {
    
    @ApiProperty({ description: 'blocked_time' })
    @IsDate()
    blocked_time: Date;

    @ApiProperty({ description: 'user_id' })
    @IsNotEmpty()
    @IsNumber()
    blocked_user_id: DeepPartial<User>;

    @ApiProperty({ description: 'user_id' })
    @IsNotEmpty()
    @IsNumber()
    user_id: DeepPartial<User>;
}