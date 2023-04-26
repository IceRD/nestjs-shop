import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(filter: { where: { id?: string; login?: string; email?: string } }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ data?: User; errors?: boolean | string[] }> {
    const existingByUserLogin = await this.findOne({ where: { login: createUserDto.login } });
    const existingByUserEmail = await this.findOne({ where: { login: createUserDto.email } });

    const errors: string[] = [];

    if (existingByUserLogin) {
      errors.push('LOGIN_ALREADY_REGISTERED');
    }

    if (existingByUserEmail) {
      errors.push('EMAIL_ALREADY_REGISTERED');
    }

    if (errors.length) {
      return {
        errors,
      };
    }

    const passwordHashed = await bcrypt.hash(createUserDto.password, 3);

    const user = new User();

    user.login = createUserDto.login;
    user.password = passwordHashed;
    user.email = createUserDto.email;

    return {
      errors: false,
      data: await user.save(),
    };
  }
}
