import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['company']) {}
