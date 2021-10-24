import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { classValidatorMessage } from './pipes/validate.factory';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import { FirestoreStore } from '@google-cloud/connect-firestore';
import { Firestore } from '@google-cloud/firestore';
import { ApiConfigService } from './api-config/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const conf = app.get(ApiConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: classValidatorMessage,
      transform: true,
    }),
  );

  const sessionOpts: session.SessionOptions = {
    secret: conf.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: conf.NODE_ENV === 'production',
    },
  };

  if (conf.NODE_ENV === 'development') {
    const RedisStore = createRedisStore(session);
    const redisClient = createClient({
      host: conf.REDIS_HOST,
      port: conf.REDIS_PORT,
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

  console.log(`Serving app at: ${conf.BACKEND_HOST}:${conf.BACKEND_PORT}`);
  await app.listen(process.env.PORT || conf.BACKEND_PORT);
}
bootstrap();
