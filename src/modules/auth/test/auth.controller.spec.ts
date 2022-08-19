import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserModule } from '../../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_SECRET } from '../../../env';
import { email, password } from '../auth.dto';
import { LoginInterface } from '../auth.interface';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../../../config/knex';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        PassportModule,
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: EXPIRES_IN },
        }),
        UserModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token', async () => {
      const result = {
        access_token: 'token',
      };
      const payload: LoginInterface = {
        email: email,
        password: password,
      };
      jest.spyOn(service, 'login').mockImplementation(async () => result);

      expect(await controller.login(payload)).toBe(result);
    });
  });
});
