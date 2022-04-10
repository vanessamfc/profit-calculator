import { Controller, Get, Param } from '@nestjs/common';
import { ItemServiceService } from './item-service.service';

@Controller()
export class ItemServiceController {
  constructor(private readonly itemServiceService: ItemServiceService) {}

  @Get(':id')
  async getItem(@Param('id') itemId) {
    return this.itemServiceService.getItem(itemId);
  }
}
