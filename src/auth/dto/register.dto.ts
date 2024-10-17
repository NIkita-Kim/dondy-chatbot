import { RegisterUserDto } from './register-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyDto } from '../../company/dto/create-company.dto';

export class RegisterDto {
  @ApiProperty({ type: RegisterUserDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => RegisterUserDto)
  user: RegisterUserDto;

  @ApiProperty({ type: CreateCompanyDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  company: CreateCompanyDto;
}
