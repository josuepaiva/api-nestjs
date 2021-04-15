import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @ApiProperty({
    example: 'joao',
    description: 'User name ',
  })
  name!: string;
  @Prop({ required: true })
  @ApiProperty({
    example: 'joao@gmail.com',
    description: 'User email ',
  })
  email!: string;
  @Prop({ required: true })
  @ApiProperty({
    example: '123kk23',
    description: 'User password ',
  })
  password!: string;
  @Prop()
  salt: string;
  @Prop({ default: [] })
  productsFavorits: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
