import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateWithUsername(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateWithEmail(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login function to be called that returns a valid session token
   * @param user to create session for
   * @returns valid session token
   */
  login(user: Omit<User, 'password'>) {
    return Buffer.from(JSON.stringify(user)).toString('base64');
  }

  /**
   * Register a new user, then returns a valid session token.
   * Essentially register then login.
   * @param createUserInput
   * @returns valid session token
   */
  async register(createUserInput: CreateUserInput) {
    const user = await this.usersService.create(createUserInput);
    return this.login(user);
  }
}
