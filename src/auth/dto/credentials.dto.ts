import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty({
    example: 'joao@gmail.com',
    description: 'User email ',
  })
  email: string;
  @ApiProperty({
    example: '12345',
    description: 'User password ',
  })
  password: string;
}
