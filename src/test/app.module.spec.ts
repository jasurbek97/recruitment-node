import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../config/knex';
import { CarbonCertificateModule } from '../modules/carbon-certificate/carbon-certificate.module';

describe('AppModule', () => {
  let appModule: AppModule;
  let authModule: AuthModule;
  let userModule: UserModule;
  let knexModule: KnexModule;
  let carbonCertificateModule: CarbonCertificateModule;
  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        AuthModule,
        UserModule,
        CarbonCertificateModule,
      ],
    }).compile();

    knexModule = appModule.get<KnexModule>(KnexModule);
    authModule = appModule.get<AuthModule>(AuthModule);
    userModule = appModule.get<UserModule>(UserModule);
    carbonCertificateModule = appModule.get<CarbonCertificateModule>(
      CarbonCertificateModule,
    );
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

  it('CarbonCertificateModule should be defined', () => {
    expect(carbonCertificateModule).toBeDefined();
  });
});
