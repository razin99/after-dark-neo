import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities/post.entity';
import { getRepository } from 'fireorm';
import { DatabaseModule, FIRESTORE } from 'src/database/database.module';
import { PostRepo } from './posts.symbol';
import { UserRepo } from 'src/users/users.symbol';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    PostsResolver,
    PostsService,
    {
      provide: PostRepo,
      inject: [FIRESTORE],
      useFactory: () => getRepository(Post),
    },
    {
      provide: UserRepo,
      inject: [FIRESTORE],
      useFactory: () => getRepository(User),
    },
  ],
})
export class PostsModule {}
