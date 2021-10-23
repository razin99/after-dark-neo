import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { Post } from './entities/post.entity';
import { getRepository } from 'fireorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    PostsResolver,
    PostsService,
    {
      provide: 'POST',
      inject: ['FIRESTORE'],
      useFactory: () => getRepository(Post),
    },
  ],
})
export class PostsModule {}
