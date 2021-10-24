import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    GraphqlModule,
    AuthModule,
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        FIRESTORE_HOST: Joi.string().required(),
        FIRESTORE_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        SESSION_SECRET: Joi.string().required(),
        SERVICE_KEY: Joi.string().required(),
        PROJECT_ID: Joi.string().required(),
        BACKEND_HOST: Joi.string().required(),
        BACKEND_PORT: Joi.number().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
