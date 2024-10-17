import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JWT } from './types/jwt.type';
import { UserDocument } from '../user/schemas/user.schema';
import { CompanyService } from '../company/company.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly companyService: CompanyService,
  ) {}

  async login(user: Pick<UserDocument, '_id' | 'password'>): Promise<JWT> {
    const payload = { sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Pick<UserDocument, '_id' | 'password'>> {
    const user = await this.userService.findOne(
      { email },
      { _id: 1, password: 1 },
    );

    if (!user) {
      return null;
    }

    const pwdCorrect = await compare(pass, user.password);

    if (pwdCorrect) {
      return user;
    }

    return null;
  }

  async register({ user, company }: RegisterDto): Promise<JWT> {
    const comp = await this.companyService.create(company);
    const usr = await this.userService.create({
      ...user,
      companyId: comp._id,
    });

    return await this.login(usr);
  }
}
