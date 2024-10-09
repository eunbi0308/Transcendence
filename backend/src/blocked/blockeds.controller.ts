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
  import { CreateBlockedDto } from './dto/create-blocked.dto';
  import { UpdateBlockedDto } from './dto/update-blocked.dto';
  import { Blocked } from './blocked.entity';
  import { BlockedsService } from './blockeds.service';
  
  @Controller('blockeds')
  export class BlockedsController {
    constructor(private readonly blockedsService: BlockedsService) {}
  
    @Post()
    async create(
        @Body() createBlockedDto: CreateBlockedDto,
    ) {
        try {
            await this.blockedsService.create(
                createBlockedDto,
            );

            return {
                success: true,
                message: 'Blocked Created Successfully',
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
                await this.blockedsService.findAll();
            return {
                success: true,
                data,
                message: 'Blocked Fetched Successfully',
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
            const data = await this.blockedsService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'Blocked Fetched Successfully',
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
        @Body() updateBlockedDto: UpdateBlockedDto,
    ) {
        try {
            await this.blockedsService.update(
                +id,
                updateBlockedDto,
            );
            return {
                success: true,
                message: 'Blocked Updated Successfully',
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
            await this.blockedsService.remove(+id);
            return {
                success: true,
                message: 'Blocked Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }