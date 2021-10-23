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
import { PaginateInput } from 'src/dto/paginate.input';
import { SortPostInput } from './dto/sort-post.input';

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
  findAll(
    @Args('paginate', { type: () => PaginateInput, nullable: true })
    paginate?: PaginateInput,
    @Args('sort', { type: () => SortPostInput, nullable: true })
    sort?: SortPostInput,
  ) {
    return this.postsService.findAll(paginate, sort);
  }

  @Query(() => [Post], { name: 'postsByUser' })
  findAllByUser(
    @Args('userId', { type: () => String }) userId: string,
    @Args('paginate', { type: () => PaginateInput, nullable: true })
    paginate?: PaginateInput,
    @Args('sort', { type: () => SortPostInput, nullable: true })
    sort?: SortPostInput,
  ) {
    return this.postsService.findAllByUser(userId, paginate, sort);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
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
    if (!(await user.posts.findById(post.id)))
      throw new UnauthorizedException();
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Boolean)
  async removePost(
    @Args('id', { type: () => String }) id: string,
    @GetUser() user: User,
  ) {
    const post = await this.postsService.findOneById(id);
    if (!post) throw new NotFoundException();
    if (!(await user.posts.findById(post.id)))
      throw new UnauthorizedException();
    return this.postsService.remove(id);
  }
}
