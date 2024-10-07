import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { USER } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([USER])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {}