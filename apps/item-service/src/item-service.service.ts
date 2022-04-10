import { Injectable } from '@nestjs/common';
import { ItemService as ItemRepository } from '@repo/repository/item/item.service';

@Injectable()
export class ItemServiceService {
  constructor(private readonly itemRepository: ItemRepository) {}
  async getItem(itemId) {
    const response = await this.itemRepository.findOne(itemId);
    console.log(response);
    return response;
  }
}
