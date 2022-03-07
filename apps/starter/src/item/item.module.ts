import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { XivApiModule } from '@xiv-api/xiv-api';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COLLECTOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'collector',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    XivApiModule,
  ],
  providers: [ItemService, ItemController],
})
export class ItemModule {}
