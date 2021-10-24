import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities/post.entity';
import { getRepository } from 'fireorm';
import { DatabaseModule, FIRESTORE } from 'src/database/database.module';
import { PostRepo } from './posts.symbol';

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
  ],
})
export class PostsModule {}
