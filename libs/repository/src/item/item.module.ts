import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemService } from './item.service';
import { Item, ItemSchema } from './schema/item.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/xiv'),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
