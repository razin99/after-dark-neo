import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Serving app at: localhost:3000`)
  await app.listen(3000);
}
bootstrap();
