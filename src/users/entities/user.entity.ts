import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String)
  @Column()
  public email: string;

  @Field(() => String)
  @Column()
  public username: string;

  @Field(() => String)
  @Column()
  public password: string;
}
