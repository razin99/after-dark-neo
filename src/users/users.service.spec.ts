import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const MOCK_USERS: CreateUserInput[] = [
  {
    username: 'bobby',
    email: 'yeetboi@gmail.com',
    password: 'tekashi6Nine',
  },
  {
    username: 'greg',
    email: 'greg69@hotmail.com',
    password: 'rockyou',
  }
]

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockRepo = () => ({
    create: jest.fn((user: User) => ({ ...user, id: 1 })),
    findOne: jest.fn((id: number) => MOCK_USERS[id]),
    find: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  // TODO: complete testing
  // TODO: use jest-spy to ensure repo functions are called

  it(`should call repository's create`, async () => {
    const spy = jest.spyOn(repository, 'create');
    const user = await service.create(MOCK_USERS[0]);
    expect(user).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(MOCK_USERS[0]);
  });

  it(`should call repository's findOne`, async () => {
    const spy = jest.spyOn(repository, 'findOne');
    const id = 1
    const user = await service.findOne(id)
    expect(user).toBeDefined()
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(id);
  });
});
