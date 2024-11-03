import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FortyTwoAuthGuard } from './guards/ft-auth/ft-auth.guard';
import { ConfigModule } from '@nestjs/config';
import FortyTwoOauthConfig from './config/ft-oauth.config';
import { FortyTwoStrategy } from './strategies/ft.strategy';
import { User } from '../users/user.entity';
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