import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

type UserNoPass = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(token: string, password: string): Promise<UserNoPass> {
    let user: UserNoPass;
    if (/@/.test(token)) {
      user = await this.authService.validateWithEmail(token, password);
    } else {
      user = await this.authService.validateWithUsername(token, password);
    }
    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }
    return user;
  }
}
