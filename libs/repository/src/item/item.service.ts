import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Item, ItemDocument } from './schema/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(item) {
    const createdItem = await this.itemModel.updateOne({ ID: item.ID }, item, {
      upsert: true,
    });
    return createdItem;
  }
  async findOne(itemId) {
    const item = await this.itemModel.findOne({ ID: itemId });
    return item;
  }
}
