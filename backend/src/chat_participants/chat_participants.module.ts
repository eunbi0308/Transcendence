import { Module } from '@nestjs/common';
import { ChatParticipantsService } from './chat_participants.service';
import { ChatParticipantsController } from './chat_participants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatParticipant } from './chat_participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatParticipant])],
  providers: [ChatParticipantsService],
  controllers: [ChatParticipantsController],
})
export class AchievementsModule {}