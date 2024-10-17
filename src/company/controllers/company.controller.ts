import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyDocument } from '../schemas/company.schema';
import { CompanyService } from '../company.service';
import { Public } from '../../shared/decorators/public.decorator';

@ApiTags('Company')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @Public()
  async findAll(): Promise<CompanyDocument[]> {
    return await this.companyService.findAll();
  }
}
