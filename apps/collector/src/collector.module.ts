import { Module } from '@nestjs/common';
import { CollectorController } from './collector.controller';
import { CollectorService } from './collector.service';
import { ItemModule } from './item/item.module';

@Module({
  imports: [ItemModule],
  controllers: [CollectorController],
  providers: [CollectorService],
})
export class CollectorModule {}
