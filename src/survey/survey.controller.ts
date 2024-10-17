import { Controller, Get, Param, Query } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { ApiTags } from '@nestjs/swagger';
import { SurveyDocument } from './schemas/survey.schema';
import { Public } from '../shared/decorators/public.decorator';

@ApiTags('Survey')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  @Public()
  async findByCompanyId(
    @Query('companyId') companyId: string,
  ): Promise<SurveyDocument[]> {
    return await this.surveyService.findAll({ companyId });
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string): Promise<SurveyDocument> {
    return await this.surveyService.findById(id);
  }
}
