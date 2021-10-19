import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      return ctx.switchToHttp().getRequest().user;
    } else if (ctx.getType<GqlContextType>() === 'graphql') {
      return GqlExecutionContext.create(ctx).getContext().req.user;
    }
  },
);
