import { Timestamp } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { BaseFirestoreRepository } from 'fireorm';
import { PaginateInput } from 'src/dto/paginate.input';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { SortPostInput } from './dto/sort-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST')
    private postsRepository: BaseFirestoreRepository<Post>,
  ) {}

  create(createPostInput: CreatePostInput, user: User) {
    const current_time = Timestamp.now();
    return user.posts.create({
      ...createPostInput,
      created_at: current_time,
      updated_at: current_time,
    });
  }

  findAll(paginate?: PaginateInput, sort?: SortPostInput) {
    return this.postsRepository
      .customQuery(async (query, _) => {
        let q = query;
        if (sort?.created_at) q = q.orderBy('created_at', sort.created_at);
        if (sort?.updated_at) q = q.orderBy('username', sort.updated_at);
        if (paginate?.skip) q = q.offset(paginate.skip);
        if (paginate?.take) q = q.limit(paginate.take);
        return q;
      })
      .find();
  }

  findAllByUser(
    userId: string,
    paginate?: PaginateInput,
    sort?: SortPostInput,
  ) {
    return this.postsRepository
      .customQuery(async (query, ref) => {
        let q = query;
        q.where(ref.parent.id, '==', userId);
        if (sort?.created_at) q = q.orderBy('created_at', sort.created_at);
        if (sort?.updated_at) q = q.orderBy('username', sort.updated_at);
        if (paginate?.skip) q = q.offset(paginate.skip);
        if (paginate?.take) q = q.limit(paginate.take);
        return q;
      })
      .find();
  }

  findOneById(id: string) {
    return this.postsRepository.findById(id);
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const post = await this.findOneById(id);
    return this.postsRepository.update({
      ...post,
      ...updatePostInput,
    });
  }

  async remove(id: string) {
    await this.postsRepository.delete(id);
    return !(await this.postsRepository.findById(id));
  }
}
