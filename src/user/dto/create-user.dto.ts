import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
    minLowercase: 1,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: Types.ObjectId })
  @IsString()
  @IsNotEmpty()
  company: Types.ObjectId;
}
