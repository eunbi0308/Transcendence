import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    // const isPasswordMatch = await compare(password, user.password);
    // if (!isPasswordMatch)
    //   throw new UnauthorizedException('Invalid credentials');

    return { id: user.id };
  }

  async getUserDetails(accessToken: string) {
       try {
         const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         });
   
         const user = userResponse.data;
         // Create or update user in your database
   
         const payload = { userId: user.id, email: user.email };
         const jwtToken = this.jwtService.sign(payload);
   
         return { accessToken: jwtToken };
       } catch (error) {
         // Handle errors, such as invalid token or API rate limits
         throw error;
       }
    }

    async exchangeCodeForAccessToken(authorization_code: string): Promise<string> {
        const clientId = process.env.FT_CLIENT_ID;
        const clientSecret = process.env.FT_CLIENT_SECRET;
        const redirectUri = process.env.REDIRECT_URL;
        const response = await axios.post('https://api.intra.42.fr/oauth/token', {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code: authorization_code,
            redirect_uri: redirectUri,
        });
        if (response.status == 200) {
            return response.data.access_token;
        } else {
            throw new Error('Failed to exchange authorization code for access token');
        }
    }

    

  async login(userId: number,) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }

  async signOut(userId: number) {
    await this.userService.updateHashedRefreshToken(userId, null);
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id };
    return currentUser;
  }

  async validateFortyTwoUser(ftUser: CreateUserDto) {
    const user = await this.userService.findByEmail(ftUser.email);
    if (user) return user;
    return await this.userService.create(ftUser);
  }
}