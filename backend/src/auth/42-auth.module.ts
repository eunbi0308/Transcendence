import { Module } from '@nestjs/common';
import { FortyTwoOAuthStrategy } from './strategies/42-oauth.strategy';
import { FortyTwoAuthGuard } from './42-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  providers: [FortyTwoOAuthStrategy, FortyTwoAuthGuard],
  controllers: [AuthController],
})
export class FortyTwoAuthModule {}