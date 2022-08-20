import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertificateService } from '../carbon-certificate.service';
import { CarbonCertificateRepo } from '../carbon-certificate.repo';
import { KnexModule } from 'nest-knexjs';
import { KnexConfigService } from '../../../config/knex';
import { carbonCertificate } from './carbon-certificate.controller.spec';
import { mockUser } from '../../user/user.repo';

describe('CarbonCertificateService', () => {
  let service: CarbonCertificateService;
  let repo: CarbonCertificateRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        KnexModule.forRootAsync({
          useClass: KnexConfigService,
        }),
      ],
      providers: [CarbonCertificateService, CarbonCertificateRepo],
    }).compile();

    service = module.get<CarbonCertificateService>(CarbonCertificateService);
    repo = module.get<CarbonCertificateRepo>(CarbonCertificateRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(repo).toBeDefined();
  });

  describe('list', () => {
    it('should return list of carbon certificates', async () => {
      jest
        .spyOn(repo, 'list')
        .mockImplementation(async () => carbonCertificate);
      const response = await service.list();
      expect(response).toStrictEqual(carbonCertificate);
    });
  });

  describe('listOfOwnCertificates', () => {
    it('should return list of own carbon certificates', async () => {
      jest
        .spyOn(repo, 'listOfOwnCertificates')
        .mockImplementation(async () => carbonCertificate);
      const response = await service.listOfOwnCertificates(mockUser);
      expect(response).toStrictEqual(carbonCertificate);
    });
  });
});
