import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AppService } from '../app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]), // Correctly add TypeOrmModule here
  ],
  providers: [ChatService, AppService], // AppService is a provider
  controllers: [ChatController], // Only controllers should be listed here
})
export class ChatsModule {}