import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Length(5, 50)
  @Field(() => String)
  username?: string;

  @Length(10, 100)
  @Field(() => String)
  password?: string;
}
