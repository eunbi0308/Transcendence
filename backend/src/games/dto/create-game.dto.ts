import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Game } from '../../games/game.entity';


export class CreateGameDto extends PartialType(Game) {
    // @ApiProperty({ description: 'user_id' })
    // @IsNotEmpty()
    // @IsNumber()
    // player1_user_id: DeepPartial<User>;

    // @ApiProperty({ description: 'user_id' })
    // @IsNotEmpty()
    // @IsNumber()
    // player2_user_id: DeepPartial<User>;

    // @ApiProperty({ description: 'user_id' })
    // @IsNotEmpty()
    // @IsNumber()
    // winner_user_id: DeepPartial<User>

    @ApiProperty({ description: 'is_ladder_game' })
    @IsBoolean()
    is_ladder_game: boolean;

}