import { Module } from '@nestjs/common';
import { ItemServiceController } from './item-service.controller';
import { ItemServiceService } from './item-service.service';
import { RepositoryModule } from '@repo/repository';

@Module({
  imports: [RepositoryModule],
  controllers: [ItemServiceController],
  providers: [ItemServiceService],
})
export class ItemServiceModule {}
