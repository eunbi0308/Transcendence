// queue.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
    constructor(private readonly queueService: QueueService) {}

    @Post('join')
    joinQueue(@Body('playerId') playerId: string): string {
        return this.queueService.joinQueue(playerId);
    }

    @Get('status')
    getQueueStatus(): string {
        return this.queueService.getCurrentQueueStatus();
    }
}
