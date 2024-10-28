
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { Controller } from '@nestjs/common';
import { BlockedsModule } from './blockeds/blockeds.module';
import { ChatParticipantsModule } from './chat_participants/chat_participants.module';
import { ChatRoomsModule } from './chat_rooms/chat_rooms.module';
import { FriendsModule } from './friends/friends.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from './auth/config/refresh-jwt.config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [refreshJwtConfig],
    }),
    PassportModule.register({
      session: false,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AchievementsModule,
    BlockedsModule,
    ChatMessagesModule,
    ChatParticipantsModule,
    ChatRoomsModule,
    FriendsModule,
    GamesModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
