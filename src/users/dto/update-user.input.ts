import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @Length(5, 50)
  @Field(() => String)
  username?: string;

  @Length(10, 100)
  @Field(() => String)
  password?: string;
}
