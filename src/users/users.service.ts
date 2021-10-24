import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PaginateInput } from 'src/dto/paginate.input';
import { SortUserInput } from './dto/sort-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { BaseFirestoreRepository } from 'fireorm';
import { Timestamp } from '@google-cloud/firestore';
import { USER } from './users.module';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER)
    private usersRepository: BaseFirestoreRepository<User>,
  ) {}

  /**
   * Create a user and return it
   * @param createUserInput required information to create a user
   * @returns the created user on success
   */
  create(createUserInput: CreateUserInput): Promise<User> {
    const created_at = Timestamp.now();
    return this.usersRepository.create({
      ...createUserInput,
      created_at,
    });
  }

  /**
   * Find a user by their id
   * @param id to lookup
   * @returns user on success
   */
  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  /**
   * Find a user by their email
   * @param email to lookup
   * @returns user on success
   */
  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.whereEqualTo('email', email).findOne();
  }

  /**
   * Find a user by their username
   * @param username to lookup
   * @returns user on success
   */
  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.whereEqualTo('username', username).findOne();
  }

  /**
   * Get all users
   * @returns all users exists
   */
  findAll(paginate?: PaginateInput, sort?: SortUserInput): Promise<User[]> {
    return this.usersRepository
      .customQuery(async (query, _) => {
        let q = query;
        if (sort?.joinDate) q = q.orderBy('created_at', sort.joinDate);
        if (sort?.username) q = q.orderBy('username', sort.username);
        if (paginate?.skip) q = q.offset(paginate.skip);
        if (paginate?.take) q = q.limit(paginate.take);
        return q;
      })
      .find();
  }

  /**
   * Remove a user with given id
   * @param id to be removed
   * @returns true if successfully removed
   */
  async remove(id: string): Promise<boolean> {
    await this.usersRepository.delete(id);
    return !(await this.usersRepository.findById(id));
  }

  /**
   * Update user with given id
   * @param id of user to update
   * @param updateUserInput information to update
   * @retuns the update user
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOneById(id);
    return this.usersRepository.update({
      ...user,
      ...updateUserInput,
    });
  }
}
