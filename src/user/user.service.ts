import { ConflictException, Injectable } from '@nestjs/common';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findOne(
    filter: RootFilterQuery<UserDocument>,
    projection?: ProjectionType<UserDocument> | null,
    options?: QueryOptions<UserDocument> | null,
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne(filter, projection, options);
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    try {
      return await this.userModel.create(dto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Email already in use');
      }

      throw e;
    }
  }
}
