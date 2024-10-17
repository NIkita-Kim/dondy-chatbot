import { ConflictException, Injectable } from '@nestjs/common';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}

  async findAll(
    filter?: RootFilterQuery<CompanyDocument>,
    projection?: ProjectionType<CompanyDocument>,
    options?: QueryOptions<CompanyDocument>,
  ): Promise<CompanyDocument[]> {
    return await this.companyModel.find(filter, projection, options);
  }

  async create(dto: CreateCompanyDto): Promise<CompanyDocument> {
    try {
      return await this.companyModel.create(dto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Company with this name already in use');
      }

      throw e;
    }
  }
}
