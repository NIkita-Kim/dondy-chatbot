import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../shared/decorators/public.decorator';
import { JWT } from './types/jwt.type';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('sign-in')
  async login(@Req() req: Request): Promise<JWT> {
    return await this.authService.login(req.user);
  }

  @Public()
  @Post('sign-up')
  async register(@Body() dto: RegisterDto): Promise<JWT> {
    return await this.authService.register(dto);
  }
}
