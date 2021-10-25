import { DocumentReference, Timestamp } from '@google-cloud/firestore';
import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Collection } from 'fireorm';

@ObjectType()
@Collection(User.collection)
export class User {
  static collection = 'users';

  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => Date)
  created_at: Date;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude()
  posts?: DocumentReference[];
}
