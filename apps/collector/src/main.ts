import { NestFactory } from '@nestjs/core';
import { CollectorModule } from './collector.module';

async function bootstrap() {
  const app = await NestFactory.create(CollectorModule);
  await app.listen(3000);
}
bootstrap();
