import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { classValidatorMessage } from './pipes/validate.factory';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Serving app at: localhost:3000`);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: classValidatorMessage,
      transform: true,
    }),
  );

  app.use(
    session({
      secret: 'reeeeeeeeeeeeeeeeeeeeee',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
