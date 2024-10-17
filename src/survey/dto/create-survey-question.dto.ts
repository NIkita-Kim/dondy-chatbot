import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { QuestionTypeEnum } from '../enum/question-type.enum';

export class CreateSurveyQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsNotEmpty()
  options: string[];

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  index: number;

  @ApiProperty({ enum: QuestionTypeEnum })
  @IsEnum(QuestionTypeEnum)
  @IsNotEmpty()
  type: QuestionTypeEnum;

  @ApiPropertyOptional({ type: Number, nullable: true })
  @IsInt()
  @Min(1)
  @IsNumber()
  @ValidateIf((object, value) => value !== null)
  nextQuestionIdx: number | null;
}
