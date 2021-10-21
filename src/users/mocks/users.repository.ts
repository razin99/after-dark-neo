import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';

export const allUsers: CreateUserInput[] = [
  {
    username: 'bobby',
    email: 'yeetboi@gmail.com',
    password: 'tekashi6Nine',
  },
  {
    username: 'greg',
    email: 'greg69@hotmail.com',
    password: 'rockyou',
  },
];

export const userRepositoryFactory = () => ({
  create: jest.fn((user: User) => ({ ...user, id: 1 })),
  findOne: jest.fn((id: number) => allUsers[id]),
  find: jest.fn(() => allUsers),
  delete: jest.fn((id: number) => ({
    affected: allUsers.length > id && id >= 0 ? 1 : 0,
  })),
  save: jest.fn((updated: User) => ({ ...updated })),
});
