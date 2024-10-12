import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Friend } from 'friends/friend.entity';


export class CreateFriendDto extends PartialType(Friend) {
    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    person1_user_id: DeepPartial<User>;

    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    person2_user_id: DeepPartial<User>;
}