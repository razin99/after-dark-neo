import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

/**
 * Guard that checks if the user has session cookie attached by calling
 * isAuthenticated.
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (context.getType() === 'http')
      // passport attaches 'isAuthenticated' to the request object
      return context.switchToHttp().getRequest<Request>().isAuthenticated();
    else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      // if its serialializable to a User, then its authenticated
      return !!ctx.getContext().req.user;
    }
    return false;
  }
}
