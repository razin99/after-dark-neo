import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

/**
 * Serializer for sessions, in cookie contains only User.id
 * Deserializing returns the full User object
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: Function) {
    const user = await this.usersService.findOneById(Number(userId));
    if (!user) done(null, false);
    else done(null, user);
  }
}
