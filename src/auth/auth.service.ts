import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Validate user with username and password
   * @returns a valid user on success, null otherwise
   */
  async validateWithUsername(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  /**
   * Validate user with email and password
   * @returns a valid user on success, null otherwise
   */
  async validateWithEmail(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  /**
   * Register a new user, then returns a valid session token.
   * Essentially register then login.
   * @param createUserInput
   * @returns valid session token
   */
  async register(createUserInput: CreateUserInput) {
    const user = await this.usersService.create(createUserInput);
    return user;
  }
}
