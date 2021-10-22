import { registerEnumType } from '@nestjs/graphql';

export enum SortEnum {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}
registerEnumType(SortEnum, { name: 'SortEnum' });
