import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';
import {
  SurveyQuestion,
  SurveyQuestionSchema,
} from './schemas/survey-question.schema';
import { CompanySurveyController } from '../company/controllers/company-survey.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Survey.name, schema: SurveySchema },
      { name: SurveyQuestion.name, schema: SurveyQuestionSchema },
    ]),
    UserModule,
  ],
  controllers: [CompanySurveyController, SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
