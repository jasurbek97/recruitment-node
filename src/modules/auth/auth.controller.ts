import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  @HttpCode(200)
  login(@Body() payload: LoginDto): Promise<Record<'access_token', string>> {
    return this.authService.login(payload);
  }
}
