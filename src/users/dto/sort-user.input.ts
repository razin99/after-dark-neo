import { Field, InputType } from '@nestjs/graphql';
import { SortEnum } from 'src/dto/sort.enum';

@InputType()
export class SortUserInput {
  @Field(() => SortEnum, { nullable: true })
  joinDate?: SortEnum;

  @Field(() => SortEnum, { nullable: true })
  username?: SortEnum;
}
