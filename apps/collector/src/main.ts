import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CollectorModule } from './collector.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CollectorModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'collector',
        noAck: false,
        prefetchCount: 1,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  app.listen();
}

bootstrap();
