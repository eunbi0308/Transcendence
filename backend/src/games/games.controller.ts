import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Delete,
  } from '@nestjs/common';
  import { CreateGameDto } from './dto/create-game.dto';
  import { GamesService } from './games.service';
  
  @Controller('games')
  export class GamesController {
    constructor(private readonly gamesService: GamesService) {}
  
    @Post()
    async create(
        @Body() createGameDto: CreateGameDto,
    ) {
        try {
            await this.gamesService.create(
                createGameDto,
            );

            return {
                success: true,
                message: 'Game Created Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Get()
    async findAll() {
        try {
            const data =
                await this.gamesService.findAll();
            return {
                success: true,
                data,
                message: 'Game Fetched Successfully',
            };
        } catch (error) {
            return {
                sucess: false,
                message: error.message,
            };
        }
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const data = await this.gamesService.findByUserId(
                +id,
            );
            return {
                success: true,
                data,
                message: 'Game Fetched Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            await this.gamesService.remove(+id);
            return {
                success: true,
                message: 'Game Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }