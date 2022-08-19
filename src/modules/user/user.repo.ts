import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { email } from '../auth/auth.dto';

export const mockUser: UserInterface = {
  id: '62f2ab79b9d51b1ff031ff3e',
  name: 'John',
  surname: 'Doe',
  email: email,
  password: '$2b$10$7oUwRGIt4h60LtQYHzts2ecz5zYirjzgrl6mAhBOYm4gxB2meYQQS',
};

@Injectable()
export class UserRepo {
  private table = 'users';

  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findOne(
    email: string,
    knex = this.knex,
  ): Promise<UserInterface | undefined> {
    try {
      return await knex
        .select(['id', 'name', 'surname', 'email', 'password'])
        .from(this.table)
        .whereRaw(`email = '${email}'`)
        .first();
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
