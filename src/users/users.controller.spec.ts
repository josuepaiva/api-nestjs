import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user';
import { UserInterface } from './interfaces/user.interface';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  // it('should be defined', () => {
  //   expect(usersController).toBeDefined();
  // });
  describe('findAll users', () => {
    it('should return an array of cats', async () => {
      const result: UserInterface[] = [
        {
          productsFavorits: ['sasa'],
          _id: '60771b4948471f003899986c',
          name: 'josue',
          email: 'josuepaiva@lavid.ufpb.br',
          password:
            '$2b$10$dVVn9Rfkhdnn82X6XSwSH.tN6OdoShxHwk2yIWnU8koMZRZH8MAh2',
          salt: '$2b$10$dVVn9Rfkhdnn82X6XSwSH.',
        },
      ];

      jest.spyOn(usersService, 'listAll').mockImplementation(() => result);

      expect(await usersController.listAll()).toBe(result);
    });
  });
});
