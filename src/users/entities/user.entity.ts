import { Timestamp } from '@google-cloud/firestore';
import { ObjectType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Collection, ISubCollection, SubCollection } from 'fireorm';
import { Post } from 'src/posts/entities/post.entity';

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

  @SubCollection(Post)
  @Field(() => [Post], { nullable: true })
  @Exclude()
  posts?: ISubCollection<Post>;

  @Field(() => Date)
  created_at: Timestamp;
}
