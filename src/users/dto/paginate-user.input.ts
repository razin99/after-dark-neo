import { Field, InputType } from '@nestjs/graphql';
import { NonNegativeIntResolver } from 'graphql-scalars';

@InputType()
export class PaginateUserInput {
  @Field(() => NonNegativeIntResolver)
  skip: number;

  @Field(() => NonNegativeIntResolver, { nullable: true })
  take?: number;
}
