import { Controller } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Controller('item')
@Processor('starter')
export class ItemController {
  @Process()
  async transcode(job: Job<any>) {
    return {};
  }
}
