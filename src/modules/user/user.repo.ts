import { Injectable } from '@nestjs/common';
import { UserInterface } from './user.interface';

export const mockUser: UserInterface = {
  id: '23332345556465',
  name: 'John',
  surname: 'Doe',
  email: 'example@gmail.com',
  password: '$2b$10$7oUwRGIt4h60LtQYHzts2ecz5zYirjzgrl6mAhBOYm4gxB2meYQQS',
};

@Injectable()
export class UserRepo {
  findOne(email: string): UserInterface | null {
    return mockUser;
  }
}
