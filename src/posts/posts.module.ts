import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
