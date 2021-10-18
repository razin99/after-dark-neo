import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that create and initialises the user session.
 * logIn method is attached by passport.
 */
@Injectable()
export class LoginWithCredentialGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // initialise the session
    await super.logIn(request);
    return true;
  }
}
