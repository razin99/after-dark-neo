import { Field, InputType } from '@nestjs/graphql';
import { SortEnum } from 'src/dto/sort.enum';

@InputType()
export class SortPostInput {
  @Field(() => SortEnum, { nullable: true })
  created_at?: SortEnum;

  @Field(() => SortEnum, { nullable: true })
  updated_at?: SortEnum;
}
