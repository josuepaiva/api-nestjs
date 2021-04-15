import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

// const mockUserRepository = () => ({
//   create: jest.fn(),
//   listAll: jest.fn(),
//   findById: jest.fn(),
//   findByEmail: jest.fn(),
//   update: jest.fn(),
//   remove: jest.fn(),
// });

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  exports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: UsersService,
    //   useValue: mockUserRepository,
    // },
  ],
})
export class UsersModule {}
