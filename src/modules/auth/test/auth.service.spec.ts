import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { mockUser, UserRepo } from '../../user/user.repo';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginInterface } from '../auth.interface';
import { email, password } from '../auth.dto';
import { PassportModule } from '@nestjs/passport';
import { EXPIRES_IN, JWT_SECRET } from '../../../env';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: UserRepo;
  let jwtService: JwtService;
  const payload: LoginInterface = {
    email: email,
    password: password,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: EXPIRES_IN },
        }),
      ],
      providers: [AuthService, JwtService, UserRepo],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<UserRepo>(UserRepo);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token', async () => {
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => mockUser);
      jest.spyOn(jwtService, 'sign').mockImplementation(() => 'token');
      const response = await service.login(payload);
      expect(response).toHaveProperty('access_token');
      expect(jwtService.decode(response.access_token)).toHaveProperty(
        'email',
        email,
      );
    });

    it('should return not found exception', async () => {
      try {
        jest.spyOn(userRepo, 'findOne').mockImplementation(() => null);
        await service.login(payload);
      } catch (e) {
        expect(e.message).toBe('User not found!');
        expect(e.status).toBe(404);
      }
    });
    it('should return bad request exception', async () => {
      try {
        payload['password'] = 'password1';
        jest.spyOn(userRepo, 'findOne').mockImplementation(() => mockUser);
        await service.login(payload);
      } catch (e) {
        expect(e.message).toBe('Email or password invalid!');
        expect(e.status).toBe(400);
      }
    });
  });
});
