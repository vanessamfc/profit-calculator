import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
