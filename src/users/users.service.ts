import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const count = await getConnection()
      .createQueryBuilder()
      .select('email')
      .from(User, 'email')
      .where('email = :email', { email: createUserInput.email })
      .getCount();
    if (count === 0) {
      const newUser = this.usersRepository.create(createUserInput);
      return this.usersRepository.save(newUser);
    }
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  findAll() {
    return this.usersRepository.find()
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }
}
