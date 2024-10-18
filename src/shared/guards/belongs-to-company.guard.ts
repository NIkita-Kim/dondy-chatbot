import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class BelongsToCompanyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request['user']['id'];
    const companyId = request.params['companyId'];
    const user = await this.userService.findOne({ _id: userId });

    return user && user.company.equals(companyId);
  }
}
