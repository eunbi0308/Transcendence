
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AchievementsModule } from './achievements/achievements.module';
import { ChatMessagesModule } from './chat_messages/chat_messages.module';
import { Controller } from '@nestjs/common';

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
    ChatMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
