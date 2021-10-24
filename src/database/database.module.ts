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
        if (conf.get<string>('NODE_ENV') === 'production') {
          admin.initializeApp({
            credential: admin.credential.cert(conf.get<string>('SERVICE_KEY')),
            projectId: conf.get<string>('PROJECT_ID'),
          });
          fireorm.initialize(admin.firestore());
        } else {
          admin.initializeApp();
          let db = admin.firestore();
          db.settings({
            host: `${conf.get<string>('FIRESTORE_HOST')}:${conf.get<number>(
              'FIRESTORE_PORT',
            )}`,
            ssl: false,
          });
          fireorm.initialize(db);
        }
      },
    },
  ],
  exports: ['FIRESTORE'],
})
export class DatabaseModule {}
