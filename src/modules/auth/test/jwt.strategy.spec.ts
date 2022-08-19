import { JwtStrategy } from '../jwt.strategy';
import { getPayload } from '../payload';
import { mockUser } from '../../user/user.repo';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_SECRET } from '../../../env';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: EXPIRES_IN },
        }),
      ],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('should return payload', async () => {
      expect(await jwtStrategy.validate(getPayload(mockUser))).toStrictEqual(
        getPayload(mockUser),
      );
    });
  });
});
