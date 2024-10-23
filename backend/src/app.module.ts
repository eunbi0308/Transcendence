
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
import { AuthUsersModule } from './auth_users/auth_users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
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
    AuthUsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService
  ],
})
export class AppModule {}
