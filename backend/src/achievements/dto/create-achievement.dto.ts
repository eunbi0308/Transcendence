import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';



export class CreateAchievementDto {
    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    user_id: DeepPartial<User>;
}