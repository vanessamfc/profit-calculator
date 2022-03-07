import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('item')
export class ItemController {
  @MessagePattern('item-collector')
  async getNotifications(
    @Payload() data: number[],
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      await new Promise((r) => setTimeout(r, 200));
      channel.ack(originalMsg);
    } catch (error) {
      console.log(error);
      channel.nack(originalMsg);
    }
  }
}
