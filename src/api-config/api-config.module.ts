import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiConfigService } from './api-config.service';

@Module({
  imports: [ConfigModule],
  exports: [ApiConfigService],
  providers: [ApiConfigService, ConfigService],
})
export class ApiConfigModule {}
