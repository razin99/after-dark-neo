import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        type: 'postgres',
        host: conf.get('POSTGRES_HOST'),
        port: conf.get('POSTGRES_PORT'),
        username: conf.get('POSTGRES_USER'),
        password: conf.get('POSTGRES_PASSWORD'),
        database: 'afterdark',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
