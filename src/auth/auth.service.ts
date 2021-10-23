import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private conf: ConfigService,
  ) {}

  /**
   * Validate user with username and password
   * @returns a valid user on success, null otherwise
   */
  async validateWithUsername(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) return null;
    const matchSuccess = await this.matchPassword(password, user.password);
    if (matchSuccess) {
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
    if (!user) return null;
    const matchSuccess = await this.matchPassword(password, user.password);
    if (matchSuccess) {
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
    if (this.conf.get<string>('NODE_ENV') === 'production')
      createUserInput.password = await bcrypt.hash(createUserInput.password, 5);
    return await this.usersService.create(createUserInput);
  }

  private async matchPassword(
    userPass: string,
    dbPass: string,
  ): Promise<boolean> {
    if (this.conf.get<string>('NODE_ENV') === 'development') {
      return userPass === dbPass;
    } else {
      return bcrypt.compare(userPass, dbPass);
    }
  }
}
