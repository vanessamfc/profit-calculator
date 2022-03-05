import { Module } from '@nestjs/common';
import { ItemServiceController } from './item-service.controller';
import { ItemServiceService } from './item-service.service';

@Module({
  imports: [],
  controllers: [ItemServiceController],
  providers: [ItemServiceService],
})
export class ItemServiceModule {}
