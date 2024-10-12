import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class GetController {
  @Get('data')
  getData() {
    return { message: 'Hello from NestJS backend!' };
  }
}