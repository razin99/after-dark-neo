import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { classValidatorMessage } from './pipes/validate.factory';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from '@google-cloud/firestore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const conf = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: classValidatorMessage,
      transform: true,
    }),
  );

  const sessionOpts: session.SessionOptions = {
    secret: conf.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: conf.get('NODE_ENV') === 'production',
    },
  };

  if (conf.get('NODE_ENV') === 'development') {
    const RedisStore = createRedisStore(session);
    const redisClient = createClient({
      host: conf.get('REDIS_HOST'),
      port: conf.get('REDIS_PORT'),
    });
    sessionOpts.store = new RedisStore({ client: redisClient });
  } else {
    sessionOpts.store = new FirestoreStore({
      dataset: new Firestore(),
      kind: 'express-sessions',
    });
  }
  app.use(session(sessionOpts));
  app.use(passport.initialize());
  app.use(passport.session());

  console.log(
    `Serving app at: ${conf.get('BACKEND_HOST')}:${conf.get('BACKEND_PORT')}`,
  );
  await app.listen(process.env.PORT || conf.get('BACKEND_PORT'));
}
bootstrap();
