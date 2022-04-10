import { Injectable } from '@nestjs/common';
import { XivApiService } from '@xiv-api/xiv-api';
import { ItemService as ItemRepository } from '@repo/repository/item/item.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly xivService: XivApiService,
    private readonly itemRepository: ItemRepository,
  ) {}

  async getItemDetail(id: number) {
    const item = await this.xivService.getItemDetail(id);
    await this.itemRepository.create(item);
    console.log(item);
  }
}
