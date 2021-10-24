import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private conf: ConfigService) {}

  get NODE_ENV(): 'development' | 'production' | string {
    return this.conf.get<string>('NODE_ENV') || 'development';
  }

  get FIRESTORE_HOST(): string {
    return this.conf.get<string>('FIRESTORE_HOST');
  }

  get FIRESTORE_PORT(): number {
    return this.conf.get<number>('FIRESTORE_PORT');
  }

  get REDIS_HOST(): string {
    return this.conf.get<string>('REDIS_HOST');
  }

  get REDIS_PORT(): number {
    return this.conf.get<number>('REDIS_PORT');
  }

  get BACKEND_HOST(): string {
    return this.conf.get<string>('BACKEND_HOST');
  }

  get BACKEND_PORT(): number {
    return this.conf.get<number>('BACKEND_PORT');
  }

  get SESSION_SECRET(): string {
    return this.conf.get<string>('SESSION_SECRET');
  }

  get SERVICE_KEY(): string {
    return this.conf.get<string>('SERVICE_KEY');
  }

  get PROJECT_ID(): string {
    return this.conf.get<string>('PROJECT_ID');
  }
}
