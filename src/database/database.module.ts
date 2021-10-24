import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { ApiConfigModule } from 'src/api-config/api-config.module';
import { ApiConfigService } from 'src/api-config/api-config.service';

export const FIRESTORE = 'firestore';

@Module({
  imports: [ApiConfigModule],
  providers: [
    {
      provide: FIRESTORE,
      inject: [ApiConfigService],
      useFactory: async (conf: ApiConfigService) => {
        conf.NODE_ENV === 'production'
          ? admin.initializeApp({
              credential: admin.credential.cert(conf.SERVICE_KEY),
              projectId: conf.PROJECT_ID,
            })
          : admin.initializeApp();

        let db = admin.firestore();
        conf.NODE_ENV === 'development' &&
          db.settings({
            host: `${conf.FIRESTORE_HOST}:${conf.FIRESTORE_PORT}`,
            ssl: false,
          });
        fireorm.initialize(db);
        return db;
      },
    },
  ],
  exports: [FIRESTORE],
})
export class DatabaseModule {}
