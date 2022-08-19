import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginInterface } from './auth.interface';

export const email = 'example@gmail.com';
export const password = 'password';

export class LoginDto implements LoginInterface {
  @ApiProperty({ default: email })
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiProperty({ default: password })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}
