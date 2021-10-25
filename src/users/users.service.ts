import { CreateUserInput } from './dto/create-user.input';
import { PaginateInput } from 'src/dto/paginate.input';
import { SortUserInput } from './dto/sort-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { BaseFirestoreRepository } from 'fireorm';
import { UserRepo } from './users.symbol';
import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepo)
    private usersRepository: BaseFirestoreRepository<User>,
  ) {}

  /**
   * Create a user and return it
   * @param createUserInput required information to create a user
   * @returns the created user on success
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    const created_at = new Date();
    const user = await this.usersRepository.create({
      ...createUserInput,
      created_at,
    });
    return plainToClass(User, user);
  }

  /**
   * Find a user by their id
   * @param id to lookup
   * @returns user on success
   */
  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    return plainToClass(User, user);
  }

  /**
   * Find a user by their email
   * @param email to lookup
   * @returns user on success
   */
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository
      .whereEqualTo('email', email)
      .findOne();
    return plainToClass(User, user);
  }

  /**
   * Find a user by their username
   * @param username to lookup
   * @returns user on success
   */
  async findOneByUsername(username: string): Promise<User> {
    const user = await this.usersRepository
      .whereEqualTo('username', username)
      .findOne();
    return plainToClass(User, user);
  }

  /**
   * Get all users
   * @returns all users exists
   */
  async findAll(
    paginate?: PaginateInput,
    sort?: SortUserInput,
  ): Promise<User[]> {
    const users = await this.usersRepository
      .customQuery(async (query, _) => {
        let q = query;
        if (sort?.joinDate) q = q.orderBy('created_at', sort.joinDate);
        if (sort?.username) q = q.orderBy('username', sort.username);
        if (paginate?.skip) q = q.offset(paginate.skip);
        if (paginate?.take) q = q.limit(paginate.take);
        return q;
      })
      .find();
    return plainToClass(User, users);
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
    const updated = await this.usersRepository.update({
      ...user,
      ...updateUserInput,
    });
    return plainToClass(User, updated);
  }
}
