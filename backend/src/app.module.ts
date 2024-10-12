
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ChatsModule } from './chats/chats.module';
import { Controller } from '@nestjs/common';
import { User } from './users/user.entity';
import { Chat } from './chats/chat.entity'
import { GetController } from './getFetch.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'user123',
      database: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AchievementsModule,
    ChatsModule,

  ],
  controllers: [AppController, GetController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
