import { User } from '../entities/user.entity';

export const allUsers: User[] = [
  {
    id: 1,
    username: 'bobby',
    email: 'yeetboi@gmail.com',
    password: 'tekashi6Nine',
    posts: [],
  },
  {
    id: 2,
    username: 'greg',
    email: 'greg69@hotmail.com',
    password: 'rockyou',
    posts: [],
  },
];

export const userRepositoryFactory = () => ({
  create: jest.fn((user: User) => ({ ...user, id: 1 })),
  findOne: jest.fn((id: number) => allUsers.find((user) => user.id === id)),
  find: jest.fn(() => allUsers),
  delete: jest.fn((id: number) => ({
    affected: allUsers.length > id && id >= 0 ? 1 : 0,
  })),
  save: jest.fn((updated: User) => ({ ...updated })),
});
