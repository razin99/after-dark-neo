import { registerEnumType } from '@nestjs/graphql';

export enum SortEnum {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}
registerEnumType(SortEnum, { name: 'SortEnum' });
