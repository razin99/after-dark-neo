import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [DatabaseModule, UsersModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
