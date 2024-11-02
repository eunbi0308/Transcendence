import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthUsersModule } from '../auth_users/auth_users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';
import { SetMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import FortyTwoOauthConfig from './config/ft-oauth.config';
import { FortyTwoStrategy } from './strategies/ft.strategy';
import { AuthUsersService } from '../auth_users/auth_users.service';
import { User } from '../users/user.entity';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { PassportModule } from '@nestjs/passport';
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../users/users.module";
import {ConfigService} from "./config/config.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(FortyTwoOauthConfig),
    PassportModule.register({ defaultStrategy: 'ft' }),
    HttpModule,
    UsersModule,
    ConfigModule,
  ],
  controllers: [
      AuthController,
  ],
  providers: [
      AuthService,
      ConfigService,
      FortyTwoStrategy,
      FortyTwoAuthGuard
  ],
  exports: [AuthService],
})

export class AuthModule {}