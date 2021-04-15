import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';

@Module({
  imports: [],
  providers: [QueueService],
})
export class QueueModule {}
