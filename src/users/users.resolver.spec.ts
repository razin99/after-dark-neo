import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { allUsers, userRepositoryFactory } from './mocks/users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepositoryFactory,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  it(`should call find all`, async () => {
    const spy = jest.spyOn(service, 'findAll');
    const users = await resolver.findAll();
    expect(users).toBeDefined();
    expect(users.length).toEqual(allUsers.length);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`should call findOneById`, async () => {
    const spy = jest.spyOn(service, 'findOneById');
    const user = await resolver.findOne(1);
    expect(user).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`call update with own user id, should be successful`, async () => {
    const spy = jest.spyOn(service, 'update');
    const user = await resolver.findOne(1);
    const updated = await resolver.updateUser(
      { password: 'abcd1234' },
      1,
      user,
    );
    expect(updated).toBeDefined();
    expect(updated.email).toEqual(user.email);
    expect(updated.password).not.toEqual(user.password);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`call update with other user id, should throw UnauthorizedException`, async () => {
    const spy = jest.spyOn(service, 'update');
    const user = await resolver.findOne(1);
    expect(() =>
      resolver.updateUser({ password: 'abcd12345' }, 2, user),
    ).toThrow(UnauthorizedException);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it(`call remove with own user id, should be successful`, async () => {
    const spy = jest.spyOn(service, 'remove');
    const user = await resolver.findOne(1);
    expect(await resolver.removeUser(user.id, user)).toEqual(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`call remove with other user id, should throw UnauthorizedException`, async () => {
    const spy = jest.spyOn(service, 'remove');
    const user = await resolver.findOne(1);
    expect(() => resolver.removeUser(2, user)).toThrow(UnauthorizedException);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
