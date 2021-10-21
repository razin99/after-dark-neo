import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  allUsers,
  userRepositoryFactory,
} from 'src/users/mocks/users.repository';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

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
        ConfigService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // use password as plaintext instead of bcrypt hashes
    process.env.NODE_ENV = 'development';
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

  it(`should register new user`, async () => {
    expect(
      await service.register({
        email: 'heelloo@gmail.com',
        username: 'not_a_user',
        password: '123__yeet__321',
      }),
    ).toBeDefined();
  });

  it(`should register new user with hashed password`, async () => {
    process.env.NODE_ENV = 'production';
    const password = '123__yeet__321';
    const user = await service.register({
      email: 'fitawh@levram.me',
      username: 'who_dis',
      password,
    });
    expect(await bcrypt.compare(password, user.password)).toBeTruthy();
    expect(await service.validateWithUsername(user.username, password)).toEqual(
      user,
    );
  });
});
