import { Module } from '@nestjs/common';
import { XivApiService } from './xiv-api.service';

@Module({
  providers: [XivApiService],
  exports: [XivApiService],
})
export class XivApiModule {}
