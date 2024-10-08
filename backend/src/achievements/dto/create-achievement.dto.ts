import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, } from 'class-validator';

export class CreateAchievementDto {
    @ApiProperty({ description: 'user_id' })
    @IsNumber()
    user_id: number;
}