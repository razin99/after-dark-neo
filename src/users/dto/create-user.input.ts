import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Length(5, 50)
  @Field(() => String)
  username: string;

  @Length(10, 100)
  @Field(() => String)
  password: string;
}
