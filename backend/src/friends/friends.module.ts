import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}