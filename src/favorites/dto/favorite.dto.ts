import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
  @ApiProperty({
    example: '4543367512203',
    description: 'Product id to be favored ',
  })
  productId: string;
  userId: string;
}
