import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';
import { Interaction } from './interaction.schema';
import { Survey, SurveyDocument } from '../../survey/schemas/survey.schema';
import * as mongoose from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;
export type ChatWithSurveyDocument = HydratedDocument<Chat, 'survey'>;

@Schema()
export class Chat {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
    set: (value: string) => new mongoose.Types.ObjectId(value),
  })
  company: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Survey.name,
    required: true,
    set: (value: string) => new mongoose.Types.ObjectId(value),
  })
  survey: Types.ObjectId | SurveyDocument;

  @Prop()
  customerId: string; // Optional customer identifier

  @Prop([Interaction])
  interactions: Interaction[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
