import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Create a user and return it
   * @param createUserInput required information to create a user
   * @returns the created user on success
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user: User = this.usersRepository.create(createUserInput);
    return await this.usersRepository.save(user);
  }

  /**
   * Find a user by their id
   * @param id to lookup
   * @returns user on success
   */
  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Find a user by their email
   * @param email to lookup
   * @returns user on success
   */
  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Find a user by their username
   * @param username to lookup
   * @returns user on success
   */
  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  /**
   * Get all users
   * @returns all users exists
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Remove a user with given id
   * @param id to be removed
   * @returns true if successfully removed
   */
  async remove(id: number): Promise<boolean> {
    const res = await this.usersRepository.delete(id);
    return res.affected === 1;
  }

  /**
   * Update user with given id
   * @param id of user to update
   * @param updateUserInput information to update
   * @retuns the update user
   */
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOneById(id);
    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }
}
