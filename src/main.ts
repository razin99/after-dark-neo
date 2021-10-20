import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { classValidatorMessage } from './pipes/validate.factory';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const conf = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: classValidatorMessage,
      transform: true,
    }),
  );

  const RedisStore = createRedisStore(session);
  const redisClient = createClient({
    host: conf.get('REDIS_HOST'),
    port: conf.get('REDIS_PORT'),
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: conf.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  console.log(
    `Serving app at: ${conf.get('BACKEND_HOST')}:${conf.get('BACKEND_PORT')}`,
  );
  await app.listen(conf.get('BACKEND_PORT'));
}
bootstrap();
