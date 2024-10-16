import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { FortyTwoAuthGuard } from './42-auth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(FortyTwoAuthGuard)
    @Get('42login')
    async login42(@Request() req) {
        return 'success';
    }

    @Get('callback')
    @UseGuards(FortyTwoAuthGuard)
    callback() {
        
    }
}
