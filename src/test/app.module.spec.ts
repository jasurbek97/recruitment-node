import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../config/knex';

describe('AppModule', () => {
  let authModule: AuthModule;
  let userModule: UserModule;
  let knexModule: KnexModule;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        AuthModule,
        UserModule,
      ],
    }).compile();

    knexModule = module.get<AuthModule>(KnexModule);
    authModule = module.get<AuthModule>(AuthModule);
    userModule = module.get<AuthModule>(UserModule);
  });

  it('KnexModule should be defined', () => {
    expect(knexModule).toBeDefined();
  });

  it('AuthModule should be defined', () => {
    expect(authModule).toBeDefined();
  });

  it('UserModule should be defined', () => {
    expect(userModule).toBeDefined();
  });
});
