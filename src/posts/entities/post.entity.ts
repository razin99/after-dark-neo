import { DocumentReference, Timestamp } from '@google-cloud/firestore';
import { ObjectType, Field } from '@nestjs/graphql';
import { Collection } from 'fireorm';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
@Collection(Post.collection)
export class Post {
  static collection = 'posts';

  @Field(() => String)
  id: string;

  @Field(() => String)
  body: string;

  @Field(() => Date)
  created_at: Timestamp;

  @Field(() => Date)
  updated_at: Timestamp;

  @Field(() => User)
  author: DocumentReference;
}
