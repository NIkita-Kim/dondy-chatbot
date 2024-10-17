import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';
import { SurveyQuestion } from './survey-question.schema';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Company.name })
  companyId: Types.ObjectId;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true, type: [SurveyQuestion] })
  questions: SurveyQuestion[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
