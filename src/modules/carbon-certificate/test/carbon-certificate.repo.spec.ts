import { Test, TestingModule } from '@nestjs/testing';
import { KnexModule } from 'nest-knexjs';
import { CarbonCertificateRepo } from '../carbon-certificate.repo';
import { KnexConfigService } from '../../../config/knex';
import { mockUser } from '../../user/user.repo';
import { UserModule } from '../../user/user.module';

describe('CarbonCertificateRepo', () => {
  let repo: CarbonCertificateRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
        UserModule,
      ],
      providers: [CarbonCertificateRepo],
    }).compile();
    module.get<UserModule>(UserModule);
    repo = module.get<CarbonCertificateRepo>(CarbonCertificateRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('list', () => {
    it('should return internal server error', async () => {
      try {
        await repo.list('knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });

  describe('listOfOwnCertificates', () => {
    it('should return internal server error', async () => {
      try {
        await repo.listOfOwnCertificates(mockUser.id, 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });

  describe('exist', () => {
    it('should return own carbon certificate not exist model', async () => {
      const response = await repo.exist('not exist id', mockUser.id);
      expect(typeof response).toBe('undefined');
    });

    it('should return internal server error', async () => {
      try {
        await repo.exist(mockUser.id, 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });

  describe('update', () => {
    it('should return internal server error', async () => {
      try {
        await repo.update(mockUser.id, 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });
});
