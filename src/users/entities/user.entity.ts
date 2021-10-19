import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String)
  @Column({ unique: true })
  public email: string;

  @Field(() => String)
  @Column()
  public username: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
