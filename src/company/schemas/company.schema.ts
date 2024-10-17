import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop({ required: false, type: String })
  description?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
