import { DocumentReference, Timestamp } from '@google-cloud/firestore';
import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Collection } from 'fireorm';

@ObjectType()
@Collection()
export class User {
  @Field(() => String)
  public id: string;

  public email: string;

  @Field(() => String)
  public username: string;

  @Exclude({ toPlainOnly: true })
  public password: string;

  @Exclude()
  posts?: DocumentReference[];

  @Field(() => Date)
  created_at: Timestamp;
}
