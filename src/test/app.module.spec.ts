import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../config/knex';
import { CarbonCertificateModule } from '../modules/carbon-certificate/carbon-certificate.module';

describe('AppModule', () => {
  let authModule: AuthModule;
  let userModule: UserModule;
  let knexModule: KnexModule;
  let carbonCertificateModule: CarbonCertificateModule;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        AuthModule,
        UserModule,
        CarbonCertificateModule,
      ],
    }).compile();

    knexModule = module.get<AuthModule>(KnexModule);
    authModule = module.get<AuthModule>(AuthModule);
    userModule = module.get<AuthModule>(UserModule);
    carbonCertificateModule = module.get<CarbonCertificateModule>(
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
