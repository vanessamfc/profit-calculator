import { Controller, Get } from '@nestjs/common';
import { ItemServiceService } from './item-service.service';

@Controller()
export class ItemServiceController {
  constructor(private readonly itemServiceService: ItemServiceService) {}

  @Get()
  getHello(): string {
    return this.itemServiceService.getHello();
  }
}
