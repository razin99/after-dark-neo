import { Inject, Injectable } from '@nestjs/common';
import { BaseFirestoreRepository } from 'fireorm';
import { PaginateInput } from 'src/dto/paginate.input';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { SortPostInput } from './dto/sort-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import * as admin from 'firebase-admin';
import { PostRepo } from './posts.symbol';
import { FIRESTORE } from 'src/database/database.module';
import { UserRepo } from 'src/users/users.symbol';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostsService {
  constructor(
    @Inject(PostRepo)
    private postsRepository: BaseFirestoreRepository<Post>,
    @Inject(UserRepo)
    private usersRepository: BaseFirestoreRepository<User>,
    @Inject(FIRESTORE) private db: admin.firestore.Firestore,
  ) {}

  async create(createPostInput: CreatePostInput, user: User) {
    const current_time = new Date();
    const post = await this.postsRepository.create({
      ...createPostInput,
      created_at: current_time,
      updated_at: current_time,
      author: this.getDocRef(User, user),
    });
    const postRef = this.getDocRef(Post, post);
    user.posts ? user.posts.push(postRef) : (user.posts = [postRef]);
    await this.usersRepository.update(user);
    return plainToClass(Post, await this.postsRepository.findById(post.id));
  }

  async findAll(paginate?: PaginateInput, sort?: SortPostInput) {
    const posts = await this.postsRepository
      .customQuery(async (query, _) => {
        return this.paginateSortQueryFactory(query, paginate, sort);
      })
      .find();
    return plainToClass(Post, posts);
  }

  async findAllByUser(
    userId: string,
    paginate?: PaginateInput,
    sort?: SortPostInput,
  ) {
    const posts = await this.postsRepository
      .customQuery(async (query, _) => {
        let q = query;
        q = q.where('author', '==', userId);
        return this.paginateSortQueryFactory(q, paginate, sort);
      })
      .find();
    return plainToClass(Post, posts);
  }

  async findOneById(id: string) {
    const post = await this.postsRepository.findById(id);
    return plainToClass(Post, post);
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    const post = await this.findOneById(id);
    const updated = await this.postsRepository.update({
      ...post,
      ...updatePostInput,
      updated_at: new Date(),
    });
    return plainToClass(Post, updated);
  }

  async remove(id: string, userId: string) {
    // id not found
    if (!(await this.postsRepository.findById(id))) return false;

    // user id not found
    const user = await this.usersRepository.findById(userId);
    if (!user) return false;

    // remove reference in user and save user
    const postIdx = user.posts.indexOf(this.getDocRef(Post, { id }));
    if (postIdx !== -1) {
      user.posts.splice(postIdx);
      await this.usersRepository.update(user);
    }

    // delete actual post
    await this.postsRepository.delete(id);
    return !(await this.postsRepository.findById(id));
  }

  private paginateSortQueryFactory(
    query: admin.firestore.Query,
    paginate: PaginateInput,
    sort: SortPostInput,
  ): admin.firestore.Query {
    let q = query;
    if (sort?.created_at) q = q.orderBy('created_at', sort.created_at);
    if (sort?.updated_at) q = q.orderBy('username', sort.updated_at);
    if (paginate?.skip) q = q.offset(paginate.skip);
    if (paginate?.take) q = q.limit(paginate.take);
    return q;
  }

  private getDocRef(klass: { collection: string }, instance: { id: string }) {
    return this.db.doc(`${klass.collection}/${instance.id}`);
  }
}
