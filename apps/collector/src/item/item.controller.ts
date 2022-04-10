import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern('item-collector')
  async getNotifications(
    @Payload() data: { id: number },
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await this.itemService.getItemDetail(data.id);
      await new Promise((r) => setTimeout(r, 200));
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);
      channel.nack(originalMsg);
    }
  }
}
