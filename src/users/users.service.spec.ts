import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { userRepositoryFactory, allUsers } from './mocks/users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it(`should call repository's create`, async () => {
    const spy = jest.spyOn(repository, 'create');
    const user = await service.create(allUsers[0]);
    expect(user).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(allUsers[0]);
  });

  it(`should call repository's findOne`, async () => {
    const spy = jest.spyOn(repository, 'findOne');
    const id = 1;
    const user = await service.findOneById(id);
    expect(user).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(id);
  });

  it(`should call repository's find`, async () => {
    const spy = jest.spyOn(repository, 'find');
    const user = await service.findAll();
    expect(user).toBeDefined();
    expect(user.length).toEqual(allUsers.length);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should call repository's delete`, async () => {
    const spy = jest.spyOn(repository, 'delete');
    const res = await service.remove(1);
    expect(res).toBeDefined();
    expect(res).toEqual(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should call repository's delete but with invalid id`, async () => {
    const spy = jest.spyOn(repository, 'delete');
    const res = await service.remove(allUsers.length + 21);
    expect(res).toBeDefined();
    expect(res).toEqual(false);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should call repository's save`, async () => {
    const spy = jest.spyOn(repository, 'save');
    const update: UpdateUserInput = {
      username: 'new_name_who_dis',
    };
    const user = await service.update(1, update);
    expect(user).toBeDefined();
    expect(user.username).toEqual(update.username);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
