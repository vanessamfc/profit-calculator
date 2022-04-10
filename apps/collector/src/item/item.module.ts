import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { XivApiModule } from '@xiv-api/xiv-api';
import { RepositoryModule } from '@repo/repository';

@Module({
  imports: [XivApiModule, RepositoryModule],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
