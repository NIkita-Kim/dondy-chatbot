import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey, SurveyDocument } from './schemas/survey.schema';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyModel: Model<Survey>,
  ) {}

  async create(dto: CreateSurveyDto): Promise<SurveyDocument> {
    return await this.surveyModel.create(dto);
  }

  async findAll(
    filter?: RootFilterQuery<SurveyDocument>,
    projection?: ProjectionType<SurveyDocument>,
    options?: QueryOptions<SurveyDocument>,
  ): Promise<SurveyDocument[]> {
    return await this.surveyModel.find(filter, projection, options);
  }

  async findById(id: string): Promise<SurveyDocument> {
    return await this.surveyModel.findById(id);
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    return await this.surveyModel.findByIdAndUpdate(id, updateSurveyDto);
  }

  async remove(id: string): Promise<void> {
    await this.surveyModel.findByIdAndDelete(id);
  }
}
