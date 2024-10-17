import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { InteractionDto } from './interaction.dto';
import { Type } from 'class-transformer';

export class UpdateConversationDto {
  @ApiProperty({ type: InteractionDto, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => InteractionDto)
  interactions: InteractionDto[];
}
