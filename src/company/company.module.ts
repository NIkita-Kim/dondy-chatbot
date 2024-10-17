import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './controllers/company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { ChatModule } from '../chat/chat.module';
import { SurveyModule } from '../survey/survey.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    ChatModule,
    SurveyModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
