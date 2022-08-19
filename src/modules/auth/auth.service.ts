import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginInterface } from './auth.interface';
import { UserRepo } from '../user/user.repo';
import { isMatch } from '../../utils';
import { JwtService } from '@nestjs/jwt';
import { getPayload } from './payload';
import { JWT_SECRET } from '../../env';

@Injectable()
export class AuthService {
  @Inject() private readonly userRepo: UserRepo;
  @Inject() private jwtService: JwtService;

  async login({ email, password }: LoginInterface) {
    const user = this.userRepo.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const is_match = await isMatch(password, user.password);
    if (!is_match) {
      throw new BadRequestException('Email or password invalid!');
    }
    const payload = getPayload(user);
    const token = this.jwtService.sign(payload, { secret: JWT_SECRET });
    return {
      access_token: token,
    };
  }
}
