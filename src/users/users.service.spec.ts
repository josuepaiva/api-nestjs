import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserTestModule } from './user.module.test';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import UserTestService from './users.service.test';

describe('UsersService', () => {
  let service: UsersService;
  let serviceUserTest: UserTestService;

  const mockCreateUser: UserDto = {
    email: 'mock@email.com',
    name: 'Mock User',
    password: 'mockPassword',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, UserTestModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    serviceUserTest = module.get<UserTestService>(UserTestService);
  });

  beforeEach(async () => {
    try {
      await serviceUserTest.drop();
    } catch {}
  });

  afterEach(async () => {
    try {
      await serviceUserTest.drop();
    } catch {}
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const result = await service.create(mockCreateUser);
    expect(result.name).toEqual('Mock User');
    expect(result.email).toEqual('mock@email.com');
  });

  it('should return all users', async () => {
    await serviceUserTest.create(mockCreateUser);

    const result = await service.listAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual(mockCreateUser.name);
    expect(result[0].email).toEqual(mockCreateUser.email);
  });
});
