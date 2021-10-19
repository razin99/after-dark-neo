import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
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

  findAll() {
    return this.postsRepository.find({
      relations: ['author'], // Post.author === User
    });
  }

  findAllByUser(userId: number) {
    return this.postsRepository.find({ where: { user: { id: userId } } });
  }

  findOneById(id: number) {
    return this.postsRepository.findOne(id);
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
