import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  allUsers,
  userRepositoryFactory,
} from 'src/users/mocks/users.repository';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`should validate username with correct password`, async () => {
    const user = allUsers[0];
    expect(
      await service.validateWithUsername(user.username, user.password),
    ).toEqual(user);
  });

  it(`should fail to validate username with incorrect password`, async () => {
    const user = allUsers[0];
    expect(
      await service.validateWithUsername(user.username, `--${user.password}--`),
    ).toEqual(null);
  });

  it(`should validate email with correct password`, async () => {
    const user = allUsers[1];
    expect(await service.validateWithEmail(user.email, user.password)).toEqual(
      user,
    );
  });

  it(`should fail to validate email with incorrect password`, async () => {
    const user = allUsers[1];
    expect(
      await service.validateWithEmail(user.email, `--${user.password}--`),
    ).toEqual(null);
  });
});
