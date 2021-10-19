import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DatabaseModule, UsersModule, GraphqlModule, AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
