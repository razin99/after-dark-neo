import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  // TODO: properly mockrepository
  const mockRepo = () => ({
    create: jest.fn((id: number) => ({ id, username: 'bob' })),
    findOne: jest.fn((id: number) => ({ id, username: 'bob' })),
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
  });

  // TODO: complete testing
  // TODO: use jest-spy to ensure repo functions are called

  it('should create', async () => {
    const user = await service.create({
      username: 'bobby_shmurda',
      email: 'yeetboi@gmail.com',
      password: 'tekashi6Nine',
    });
    expect(user.id).toBeDefined();
  });

  it('should find all', async () => {
    const user = await service.findOne(1)
    expect(user.id).toEqual(1);
  });
});
