import { TwoFactorAuthService } from "./twoFactorAuth.service";
import { 
    Body, 
    ClassSerializerInterceptor, 
    Controller, 
    Post, 
    Req, 
    Res, 
    UseGuards, 
    UseInterceptors,
    UnauthorizedException,
    ForbiddenException
} from "@nestjs/common";
import { Response } from "express";
import { JwtAccessAuthGuard } from "../guards/jwt-access.guard";
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service";
import { TwoFactorAuthCodeDto } from "../dto/twoFactorAuthCode.dto";

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthController {
  constructor(
    private readonly twoFactorAuthService: TwoFactorAuthService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post('generate')
  @UseGuards(JwtAccessAuthGuard)
  async register(@Res() res: Response, @Req() request: RequestWithUser) {
    const { otpAuthUrl } = await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(request.user);

    return await this.twoFactorAuthService.pipeQrCodeStream(res, otpAuthUrl);
  }

  @Post('turn-on')
  @UseGuards(JwtAccessAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() req: RequestWithUser,
    @Body() twoFactorAuthCodeDto: TwoFactorAuthCodeDto
  ) {
    const isCodeValidated = await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthCodeDto.twoFactorAuthenticationCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(req.user.id);

    return {
      msg: "TwoFactorAuthentication turned on"
    }
  }

  @Post('turn-off')
  @UseGuards(JwtAccessAuthGuard)
  async turnOffTwoFactorAuthentication(
    @Req() req: RequestWithUser,
    @Body() twoFactorAuthCodeDto: TwoFactorAuthCodeDto
  ) {
    const isCodeValidated = await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthCodeDto.twoFactorAuthenticationCode, req.user
    );
    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    await this.usersService.turnOffTwoFactorAuthentication(req.user.id);

    return {
      msg: "TwoFactorAuthentication turned off"
    }
  }

  @Post('authenticate')
  @UseGuards(JwtAccessAuthGuard)
  async authenticate(
    @Req() req: any,
    @Body() twoFactorAuthCodeDto: TwoFactorAuthCodeDto
  ) {
    const isCodeValidated = await this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthCodeDto.twoFactorAuthenticationCode, req.user
    );

    if (!req.user.twoFactorAuthEnabled) {
      throw new ForbiddenException('Two-Factor Authentication is not enabled');
    }

    if (!isCodeValidated) {
      throw new UnauthorizedException('Invalid Authentication-Code');
    }
    
    req.user.isSecondFactorAuthenticated = true;

    const accessToken = await this.authService.generateAccessToken(req.user, true);
    
    req.res.cookie('2fa_token', accessToken, {
      httpOnly: true,
      path: '/',
    });

    return req.user;
  }
}