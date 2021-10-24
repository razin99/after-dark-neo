import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { getRepository } from 'fireorm';
import { DatabaseModule, FIRESTORE } from 'src/database/database.module';

export const USER = 'USER-REPOSITORY';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersResolver,
    UsersService,
    {
      provide: USER,
      inject: [FIRESTORE], // make sure firestore is initialized
      useFactory: () => getRepository(User),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
