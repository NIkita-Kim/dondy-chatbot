import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { QuestionTypeEnum } from '../enum/question-type.enum';

export type SurveyQuestionDocument = HydratedDocument<SurveyQuestion>;
@Schema({
  autoCreate: false,
})
export class SurveyQuestion {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, type: [String] })
  options: string[];

  @Prop({ required: true, type: Number })
  index: number;

  @Prop({ required: true, enum: QuestionTypeEnum })
  type: QuestionTypeEnum;

  @Prop({
    required: function () {
      return Number.isInteger(this.nextQuestionIdx);
    },
    type: Number,
  })
  nextQuestionIdx: number | null;
}

export const SurveyQuestionSchema =
  SchemaFactory.createForClass(SurveyQuestion);
