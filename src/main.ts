import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { classValidatorMessage } from './pipes/validate.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Serving app at: localhost:3000`);
  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory: classValidatorMessage }),
  );
  await app.listen(3000);
}
bootstrap();
