import { User } from '../entities/user.entity';

export let allUsers: User[] = [
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
  create: jest.fn((user: User) => ({ ...user, id: allUsers.length + 1 })),
  findOne: jest.fn(
    (token: number | { where: { username?: string; email?: string } }) =>
      typeof token === 'number'
        ? allUsers.find((user) => user.id === token)
        : allUsers.find(
            (user) =>
              user.username === token.where?.username ||
              user.email === token.where?.email,
          ),
  ),
  find: jest.fn(() => allUsers),
  delete: jest.fn((id: number) => ({
    affected: allUsers.length > id && id >= 0 ? 1 : 0,
  })),
  save: jest.fn((user: User) => {
    allUsers.push(user);
    return user;
  }),
});
