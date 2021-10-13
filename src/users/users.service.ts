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
    private usersRepository: Repository<User>
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.usersRepository.create(createUserInput)
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  findAll() {
    return this.usersRepository.find()
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    const updatedUser = { ...user, ...updateUserInput }
    return this.usersRepository.save(updatedUser)
  }
}
