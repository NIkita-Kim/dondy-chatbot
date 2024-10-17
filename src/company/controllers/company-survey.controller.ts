import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SurveyService } from '../../survey/survey.service';
import { SurveyDocument } from '../../survey/schemas/survey.schema';
import { BelongsToCompanyGuard } from '../../shared/guards/belongs-to-company.guard';
import { CreateSurveyForCompanyDto } from '../../survey/dto/create-survey-for-company.dto';
import { UpdateSurveyDto } from '../../survey/dto/update-survey.dto';

@ApiTags('Company survey')
@ApiBearerAuth()
@UseGuards(BelongsToCompanyGuard)
@Controller('companies/:companyId/surveys')
export class CompanySurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get()
  async findAll(
    @Param('companyId') companyId: string,
  ): Promise<SurveyDocument[]> {
    return await this.surveyService.findAll({
      companyId,
    });
  }

  @Post()
  async create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateSurveyForCompanyDto,
  ): Promise<SurveyDocument> {
    return await this.surveyService.create({
      companyId,
      ...dto,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SurveyDocument> {
    return await this.surveyService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSurveyDto,
  ): Promise<SurveyDocument> {
    return await this.surveyService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.surveyService.remove(id);
  }
}
