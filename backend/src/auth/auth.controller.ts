import {
    Controller,
    Get, HttpStatus,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { Request, Response as ExpressResponse } from 'express';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';
import { UsersService } from "../users/users.service";
import { ConfigService } from "./config/config.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly configservice: ConfigService
    ) {}

    @Get('42/login')
    @UseGuards(FortyTwoAuthGuard)
    fortyTwoLogin(@Req() req: Request) {}

    @Get('42/callback')
    @UseGuards(FortyTwoAuthGuard)
    async fortyTwoCallback(@Req() req: Request, @Res() res) {
        const cookie = this.usersService.signToken(req.user['id']);
        req.res.cookie('jwt', cookie, { path: '/', httpOnly: true });
        console.log(res.accessToken);
        req.res.redirect('https://localhost:3000');
    }
}