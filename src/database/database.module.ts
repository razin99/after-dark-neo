import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIRESTORE',
      inject: [ConfigService],
      useFactory: async (conf: ConfigService) => {
        admin.initializeApp({
          credential: admin.credential.cert(conf.get<string>('SERVICE_KEY')),
          projectId: conf.get<string>('PROJECT_ID'),
        });
        fireorm.initialize(admin.firestore());
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class DatabaseModule {}
