import { Controller, Inject } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ItemService } from './item.service';
import { ClientRMQ } from '@nestjs/microservices';

@Controller('item')
@Processor('starter')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    @Inject('COLLECTOR_SERVICE') private client: ClientRMQ,
  ) {}

  @Process()
  async transcode() {
    const ids = await this.itemService.sendAllIds();
    ids.map((id) => this.client.emit('item-collector', { id }));
    return true;
  }
}
