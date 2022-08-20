import { Test, TestingModule } from '@nestjs/testing';
import { KnexModule } from 'nest-knexjs';
import { CarbonCertificateRepo } from '../carbon-certificate.repo';
import { KnexConfigService } from '../../../config/knex';
import { mockUser } from '../../user/user.repo';

describe('CarbonCertificateRepo', () => {
  let repo: CarbonCertificateRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
      ],
      providers: [CarbonCertificateRepo],
    }).compile();
    repo = module.get<CarbonCertificateRepo>(CarbonCertificateRepo);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('list', () => {
    it('should return carbon certificate model', async () => {
      const response = await repo.list();
      expect(typeof response).toBe('object');
    });

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
    it('should return own carbon certificate model', async () => {
      const response = await repo.listOfOwnCertificates(mockUser.id);
      expect(typeof response).toBe('object');
    });

    it('should return internal server error', async () => {
      try {
        await repo.listOfOwnCertificates(mockUser.id, 'knex' as any);
      } catch (e) {
        expect(e.message).toBe('Something went wrong!');
        expect(e.status).toBe(500);
      }
    });
  });
});
