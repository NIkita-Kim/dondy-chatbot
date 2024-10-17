import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';
import { Interaction } from './interaction.schema';
import { Survey } from '../../survey/schemas/survey.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Survey.name, required: true })
  surveyId: Types.ObjectId;

  @Prop()
  customerId: string; // Optional customer identifier

  @Prop([Interaction])
  interactions: Interaction[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
