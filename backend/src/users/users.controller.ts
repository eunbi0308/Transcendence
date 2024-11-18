import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Delete,
    HttpException,
    Req
  } from '@nestjs/common';
  import { Request } from 'express';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { User } from './user.entity';
  import { UsersService } from './users.service';
  import Cookies from 'universal-cookie';
  import { JwtService } from '@nestjs/jwt';
  
  @Controller('users')
  export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
  
    @Post()
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        try {
            await this.usersService.create(
                createUserDto,
            );

            return {
                success: true,
                message: 'User Created Successfully',
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
                await this.usersService.findAll();
            return {
                success: true,
                data,
                message: 'User Fetched Successfully',
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
            const data = await this.usersService.findOne(
                +id,
            );
            return {
                success: true,
                data,
                message: 'User Fetched Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    @Patch('me')
    async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) 
    {
        const token = req.signedCookies['jwt'];
        // console.log(token);
        // if (!token) {
        //     throw new HttpException('No JWT token found', 401);
        // }

        // const decodedToken = this.jwtService.decode(token);
        // if (!decodedToken || typeof decodedToken !== 'object') {
        //     throw new HttpException('Invalid JWT token', 401);
        // }

        // const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        // if (decodedToken.exp < currentTime) {
        // throw new HttpException('JWT token has expired', 401);
        // }

        try {
            const userId = await this.usersService.getUserIdFromCookie(token);

            console.log("user id: " + userId);
            await this.usersService.update(
                userId,
                updateUserDto,
            );
            return {
                success: true,
                message: 'User Updated Successfully',
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
            await this.usersService.remove(+id);
            return {
                success: true,
                message: 'User Deleted Successfully',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}
