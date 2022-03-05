import { NestFactory } from '@nestjs/core';
import { ItemServiceModule } from './item-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemServiceModule);
  await app.listen(3000);
}
bootstrap();
