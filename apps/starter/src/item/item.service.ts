import { Injectable } from '@nestjs/common';
import { XivApiService } from '@xiv-api/xiv-api';

@Injectable()
export class ItemService {
  constructor(private readonly xivService: XivApiService) {}

  async sendAllIds() {
    const allIds = await this.xivService.getAllItemsIds();
    return allIds;
  }
}
