import { Controller,
          Get,
          HttpCode,
          HttpStatus,
          Post,
          Req,
          Request,
          Res,
          UseGuards
 } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // return this.authService.login(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    // return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@Req() req) {
    // this.authService.signOut(req.user.id);
  }

  @Public()
  @UseGuards(FortyTwoAuthGuard)
  @Get('42/login')
  fortyTwoLogin() {}

  @Public()
  @UseGuards(FortyTwoAuthGuard)
  @Get('42/callback')
  fortyTwoCallback() {}
//   async fortyTwoCallback(@Req() req, @Res() res) {
//     const response = await this.authService.login(req.user.id);
//     res.redirect(`http://localhost:3000?token=${response.accessToken}`);
//   }
}