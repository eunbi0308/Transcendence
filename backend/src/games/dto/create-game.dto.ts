import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';
import { Game } from '../../games/game.entity';


export class CreateGameDto extends PartialType(Game) {

    @ApiProperty({ description: 'Player 1 user ID' })
    @IsNotEmpty()
    @IsNumber()
    player1_user_id: number;

    @ApiProperty({ description: 'Player 2 user ID' })
    @IsNotEmpty()
    @IsNumber()
    player2_user_id: number;

    @ApiProperty({ description: 'Winner user ID' })
    @IsNotEmpty()
    @IsNumber()
    winner_user_id: number;

    @ApiProperty({ description: 'Is it a ladder game?' })
    @IsBoolean()
    is_ladder_game: boolean;

}