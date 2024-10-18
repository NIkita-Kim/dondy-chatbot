import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  survey: string;
}
