import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'afterdark',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ]
})
export class DatabaseModule { }

// TODO: use ConfigModule and ConfigService to load configs from .env file
