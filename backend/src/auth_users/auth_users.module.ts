import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth_users.service';

@Module({
  providers: [AuthUsersService],
  exports: [AuthUsersService],
})
export class AuthUsersModule {}
