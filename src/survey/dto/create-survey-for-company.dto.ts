import { OmitType } from '@nestjs/swagger';
import { CreateSurveyDto } from './create-survey.dto';

export class CreateSurveyForCompanyDto extends OmitType(CreateSurveyDto, [
  'companyId',
]) {}
