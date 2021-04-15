import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  email!: string;
  @Prop({ required: true })
  password!: string;
  @Prop()
  salt: string;
  @Prop({ default: [] })
  productsFavorits: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);
