import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'joao', description: 'The name user' })
  name: string;
  @ApiProperty({ example: 'joao@gmail.com', description: 'The email user' })
  email: string;
  @ApiProperty({ example: '123466', description: 'The password user' })
  password: string;
}
