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
  import { CreateFriendDto } from './dto/create-friend.dto';
  import { UpdateFriendDto } from './dto/update-friend.dto';
  import { Friend } from './friend.entity';
  import { FriendsService } from './friends.service';
  
  @Controller('friends')
  export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}
  
    @Post()
    async create(
        @Body() createFriendDto: CreateFriendDto,
    ) {
        try {
            await this.friendsService.create(
                createFriendDto,
            );

            return {
                success: true,
                message: 'Friend Created Successfully',
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
                await this.friendsService.findAll();
            return {
                success: true,
                data,
                message: 'Friend Fetched Successfully',
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
            const data = await this.friendsService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'Friend Fetched Successfully',
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
        @Body() updateFriendDto: UpdateFriendDto,
    ) {
        try {
            await this.friendsService.update(
                +id,
                updateFriendDto,
            );
            return {
                success: true,
                message: 'Friend Updated Successfully',
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
            await this.friendsService.remove(+id);
            return {
                success: true,
                message: 'Friend Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
  }