import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export const FIRESTORE = 'firestore';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FIRESTORE,
      inject: [ConfigService],
      useFactory: async (conf: ConfigService) => {
        let db = admin.firestore();
        if (conf.get<string>('NODE_ENV') === 'production') {
          admin.initializeApp({
            credential: admin.credential.cert(conf.get<string>('SERVICE_KEY')),
            projectId: conf.get<string>('PROJECT_ID'),
          });
        } else {
          admin.initializeApp();
          db.settings({
            host: `${conf.get<string>('FIRESTORE_HOST')}:${conf.get<number>(
              'FIRESTORE_PORT',
            )}`,
            ssl: false,
          });
        }
        fireorm.initialize(db);
        return db;
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class DatabaseModule {}
