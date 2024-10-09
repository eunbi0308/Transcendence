import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';

export class CreateBlockedDto {
    @ApiProperty({ description: 'blocked_user_id' })
    @IsNumber()
    blocked_user_id: number;

    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    user_id: number;

    @ApiProperty({ description: 'blocked date' })
    @IsDate()
    date: Date;
}