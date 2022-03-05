import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'starter',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private router;
  constructor(@InjectQueue('starter') private starterQueue: Queue) {
    const { router } = createBullBoard([
      new BullAdapter(starterQueue, { readOnlyMode: false }),
    ]);
    starterQueue.add({}, { repeat: { cron: '0 0 22 * * *' }, jobId: 'test' });
    this.router = router;
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(this.router).forRoutes('/admin/queues');
  }
}
