import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Length(5, 50)
  @Field(() => String)
  username?: string;

  @Length(10, 100)
  @Field(() => String)
  password?: string;
}
