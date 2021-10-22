import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum SortEnum {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}
registerEnumType(SortEnum, { name: 'SortEnum' });

@InputType()
export class SortPostInput {
  @Field(() => SortEnum, { nullable: true })
  created_at?: SortEnum;

  @Field(() => SortEnum, { nullable: true })
  updated_at?: SortEnum;
}
