import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from 'users/user.entity';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
    // @ApiProperty({ description: 'person1 users' })
    // @IsNumber()
    // person1_user_id: DeepPartial<User>

    // @ApiProperty({ description: 'person2 users' })
    // @IsNumber()
    // person2_user_id: DeepPartial<User>
}