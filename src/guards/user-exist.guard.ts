import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.checkEmail(req.body.email);
  }

  /**
   * @param email to check
   * @returns true if found user with given email
   * @raises ForbiddenException if user exists
   */
  async checkEmail(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) throw new ForbiddenException('Email already in use');
    return true;
  }
}
