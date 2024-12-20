import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import FortyTwoOauthConfig from '../config/ft-oauth.config';
import { FortyTwoStrategy } from './strategies/ft.strategy';
import { User } from '../users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwoFactorAuthService } from './twoFactorAuth/twoFactorAuth.service';
import { TwoFactorAuthController } from './twoFactorAuth/twoFactorAuth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(FortyTwoOauthConfig),
    PassportModule.register({ defaultStrategy: 'ft' }),
    HttpModule,
    UsersModule,
    ConfigModule.forRoot(), // Ensure ConfigModule is imported and configured
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
    TwoFactorAuthController,
  ],
  providers: [
    AuthService,
    ConfigService,
    FortyTwoStrategy,
    FortyTwoAuthGuard,
    JwtStrategy,
    TwoFactorAuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}