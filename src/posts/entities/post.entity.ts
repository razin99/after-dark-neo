import { Timestamp } from '@google-cloud/firestore';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => Date)
  created_at: Timestamp;

  @Field(() => Date)
  updated_at: Timestamp;
}
