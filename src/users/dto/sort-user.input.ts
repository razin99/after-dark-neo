import { Field, InputType, registerEnumType } from '@nestjs/graphql';

enum SortEnum {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}
registerEnumType(SortEnum, { name: 'SortEnum' });

@InputType()
export class SortUserInput {
  @Field(() => SortEnum, { nullable: true })
  joinDate?: SortEnum;

  @Field(() => SortEnum, { nullable: true })
  username?: SortEnum;
}
