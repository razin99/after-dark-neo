import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.usersRepository.create(createUserInput);
  }

  findOneById(id: number) {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll() {
    return this.usersRepository.find();
  }

  async remove(id: number) {
    const res = await this.usersRepository.delete(id);
    return res.affected === 1;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOneById(id);
    return this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
  }
}
