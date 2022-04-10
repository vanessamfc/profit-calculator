import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';
import { RepositoryService } from './repository.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), ItemModule],
  providers: [RepositoryService],
  exports: [RepositoryService, ItemModule],
})
export class RepositoryModule {}
