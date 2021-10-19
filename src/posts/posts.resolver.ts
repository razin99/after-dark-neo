import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { GetUser } from 'src/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GetUser() user: User,
  ) {
    return this.postsService.create(createPostInput, user);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => [Post], { name: 'postsByUser' })
  findAllByUser(@Args('userId', { type: () => Int }) userId: number) {
    return this.postsService.findAllByUser(userId);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOneById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @GetUser() user: User,
  ) {
    const post = await this.findOne(updatePostInput.id);
    if (!post) throw new NotFoundException();
    if (post.author.id !== user.id) throw new UnauthorizedException();
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Boolean)
  async removePost(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: User,
  ) {
    const post = await this.postsService.findOneById(id);
    if (!post) throw new NotFoundException();
    if (post.author.id !== user.id) throw new UnauthorizedException();
    return this.postsService.remove(id);
  }
}
