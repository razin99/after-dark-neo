import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateInput } from 'src/dto/paginate.input';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { SortPostInput } from './dto/sort-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput, user: User) {
    const post: Post = this.postsRepository.create({
      ...createPostInput,
      author: user,
    });
    return this.postsRepository.save(post);
  }

  findAll(paginate?: PaginateInput, sort?: SortPostInput) {
    return this.postsRepository.find({
      relations: ['author'], // Post.author === User
      skip: paginate?.skip || 0,
      take: paginate?.take || 10,
      order: {
        created_at: sort?.created_at,
        updated_at: sort?.updated_at,
      },
    });
  }

  findAllByUser(
    userId: number,
    paginate?: PaginateInput,
    sort?: SortPostInput,
  ) {
    return this.postsRepository.find({
      relations: ['author'], // Post.author === User
      where: { author: { id: userId } },
      skip: paginate?.skip || 0,
      take: paginate?.take || 10,
      order: {
        created_at: sort?.created_at,
        updated_at: sort?.updated_at,
      },
    });
  }

  findOneById(id: number) {
    return this.postsRepository.findOne(id, {
      relations: ['author'], // Post.author === User
    });
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.findOneById(id);
    return this.postsRepository.save({
      ...post,
      ...updatePostInput,
    });
  }

  async remove(id: number) {
    const res = await this.postsRepository.delete(id);
    return res.affected === 1;
  }
}
