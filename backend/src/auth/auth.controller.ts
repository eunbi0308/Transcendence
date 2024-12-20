import {
    Controller,
    Get, HttpStatus,
    Req,
    Res,
    Delete,
    UseGuards
} from '@nestjs/common';
import { Request, Response as ExpressResponse } from 'express';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';
import { UsersService } from "../users/users.service";
import { ConfigService } from "./config/config.service";
import { read } from 'fs';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly configservice: ConfigService
    ) {}

    // https://localhost:3000/auth/42/login
    @Get('42/login')
    @UseGuards(FortyTwoAuthGuard)
    fortyTwoLogin(@Req() req: Request) {}

    @Get('42/callback')
    @UseGuards(FortyTwoAuthGuard)
    async fortyTwoCallback(@Req() req: Request, @Res() res: ExpressResponse) {
        if (req.user['twofactor'] == true) {
            const checkCookie = await this.usersService.checkToken(req.user['id']);
            req.res.cookie('jwt', checkCookie, {path: '/', httpOnly: true, signed: true});
              // req.res.redirect('http://localhost:3001/two-factor');
        }
        const token = await this.usersService.signToken(req.user['id']);
        req.res.cookie('jwt', token, { httpOnly: true, signed: true});
        if (req.user['nickname'] == null || req.user['nickname'].length == 0)
        { 
            req.res.redirect(`http://localhost:3001/update`);
        }
        else
            req.res.redirect('http://localhost:3001');
        return ;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('42/logout')
    async fortyTwoLogout(@Req() req: Request, @Res() res: ExpressResponse) {
        res.clearCookie('jwt');
        res.status(HttpStatus.OK).send();
        req.res.redirect('http://localhost:3001/login');
    }
}