import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatParticipantsService } from './chat_participants.service';
import { ChatParticipantsController } from './chat_participants.controller';
import { ChatParticipant } from './chat_participant.entity';
import { User } from '../users/user.entity';
import { ChatRoom } from '../chat_rooms/chat_room.entity';
import { UsersModule } from '../users/users.module';
import { ChatRoomsModule } from '../chat_rooms/chat_rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatParticipant, User, ChatRoom]),
    UsersModule,
    ChatRoomsModule,
  ],
  providers: [ChatParticipantsService],
  controllers: [ChatParticipantsController],
  exports: [ChatParticipantsService],
})
export class ChatParticipantsModule {}
