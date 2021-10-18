import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Guard that checks if the user has session cookie attached by calling
 * isAuthenticated.
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // check if user is authenticated
    // passport attaches this to the request object
    return request.isAuthenticated();
  }
}
