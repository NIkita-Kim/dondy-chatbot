import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hashSync } from 'bcryptjs';
import { Types } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    set: (value: string) => hashSync(value, 10),
  })
  password: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    set: (value: string) => new mongoose.Types.ObjectId(value),
  })
  company: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
