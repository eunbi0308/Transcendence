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
  import { CreateAchievementDto } from './dto/create-achievement.dto';
  import { UpdateAchievementDto } from './dto/update-achievement.dto';
  import { Achievement } from './achievement.entity';
  import { AchievementsService } from './achievements.service';
  
  @Controller('achievements')
  export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) {}
  
    @Post()
    async create(
        @Body() createAchievementDto: CreateAchievementDto,
    ) {
        try {
            await this.achievementsService.create(
                createAchievementDto,
            );

            return {
                success: true,
                message: 'Achievement Created Successfully',
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
                await this.achievementsService.findAll();
            return {
                success: true,
                data,
                message: 'Achievement Fetched Successfully',
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
            const data = await this.achievementsService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'Achievement Fetched Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAchievementDto: UpdateAchievementDto,
    ) {
        try {
            await this.achievementsService.update(
                +id,
                updateAchievementDto,
            );
            return {
                success: true,
                message: 'Achievement Updated Successfully',
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
            await this.achievementsService.remove(+id);
            return {
                success: true,
                message: 'Achievement Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }